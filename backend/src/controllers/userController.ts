import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer"
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prismaClient = new PrismaClient();

const generateToken = (userId: number) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY!, { expiresIn: '1h' });
};

export const signupHandler = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    try {
        const user = await prismaClient.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name
            },
        });

        return res.status(201).json(user) as any;
    } catch (error) {
        return res.status(400).json({ error: 'User already exists' });
    }
};

export const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({
        where: { email },
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
    // provavelmente trocar o service de gmail para outro - talvez ethereal mail err 535

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Please use the following token to reset your password: ${token}`,
    };

    await transporter.sendMail(mailOptions);
};

export const requestPasswordResetHandler = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await prismaClient.user.findUnique({
        where: { email },
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
            where: { id: decoded.userId },
            data: { password: hashedPassword },
        });

        return res.status(200).json({ message: 'Password reset successful' }) as any;
    } catch (error) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }
};