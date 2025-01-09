import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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