import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer"
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prismaClient = new PrismaClient();

const generateToken = (userId: number) => {
    return jwt.sign({
        userId 
    }, process.env.SECRET_KEY!, { expiresIn: '1h' });
};

export const signupHandler = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await prismaClient.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        return res.status(201).json(user) as any;
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

export const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({
        where: {
            email 
        },
    });

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    return res.json({ token }) as any;
};

const sendResetEmail = async (email: string, token: string) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Please use the following URL to reset your password: http://localhost:5173/resetPassword/${token}`,
    };

    await transporter.sendMail(mailOptions);
};

export const requestPasswordResetHandler = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await prismaClient.user.findUnique({
        where: {
            email 
        },
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const token = generateToken(user.id);
    await sendResetEmail(email, token);

    return res.status(200).json({ message: 'Password reset email sent' }) as any;
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    try {
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);
        const hashedPassword = await bcrypt.hash(newPassword, 8);

        await prismaClient.user.update({
            where: {
                id: decoded.userId 
            },
            data: { 
                password: hashedPassword 
            },
        });

        return res.status(200).json({ message: 'Password reset successful' }) as any;
    } catch (error) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }
};

interface JwtPayload {
    userId: number;
}

export const getUserInfoHandler = async (req: Request, res: Response) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authToken?.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
        const user = await prismaClient.user.findUnique({ 
            where: {
                id: decoded.userId 
            } 
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        return res.json(user) as any;
    }catch(error){
        return res.status(401).json({ error: 'Invalid token' });
    }

}

export const updateUserInfoHandler = async (req: Request, res: Response) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authToken?.split(' ')[1];
    const { name, email } = req.body;

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
        const user = await prismaClient.user.update({
            where: {
                id: decoded.userId 
            },
            data: {
                name, 
                email 
            },
        });

        return res.json(user) as any;
    }catch(error){
        return res.status(401).json({ error: 'Invalid token' });
    }
};