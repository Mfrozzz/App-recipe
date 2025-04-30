import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();

const prismaClient = new PrismaClient();

export const createReviewHandler = async (req: Request, res: Response) => {
    const  { recipeId, userId, rating, comment } = req.body;

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const review = await prismaClient.reviews.create({
            data: {
                recipeId: parseInt(recipeId),
                userId: userId,
                rating: rating,
                comment: comment
            }
        });
        return res.status(201).json(review) as any;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" })
    }
}

export const getReviewsByRecipeHandler = async (req: Request, res: Response) => {
    const { recipeId } = req.params;

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const reviews = await prismaClient.reviews.findMany({
            where: {
                recipeId: parseInt(recipeId)
            },
            orderBy: {
                date: "desc"
            }
        });

        const averageRating = await prismaClient.reviews.aggregate({
            where: {
                recipeId: parseInt(recipeId)
            },
            _avg: {
                rating: true
            }
        });

        return res.status(200).json({
            reviews,
            averageRating: averageRating._avg.rating
        }) as any;

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}