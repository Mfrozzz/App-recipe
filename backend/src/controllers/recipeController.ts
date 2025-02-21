import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { searchRecipes } from '../service/SearchRecipeService';
import { getRecipeSummary } from '../service/GetRecipeSummaryService';
import { getFavouriteRecipesByIds } from '../service/GetFavouriteRecipesByIdsService';

const prismaClient = new PrismaClient();

export const searchRecipesHandler = async (req: Request, res: Response) => {
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);
    const results = await searchRecipes(searchTerm, page);
    return res.json(results) as any;
};

export const getRecipeSummaryHandler = async (req: Request, res: Response) => {
    const recipeId = req.params.recipeId;
    const results = await getRecipeSummary(recipeId);
    return res.json(results) as any;
};

export const getFavouriteRecipesHandler = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const favouriteRecipes = await prismaClient.favouriteRecipes.findMany({
            where: { userId: parseInt(userId) },
        });
        const recipeIds = favouriteRecipes.map((recipe) => recipe.recipeId.toString());
        const favourites = await getFavouriteRecipesByIds(recipeIds);
        return res.json(favourites) as any;
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong"
        });
    }
};

export const addFavouriteRecipeHandler = async (req: Request, res: Response) => {
    const { recipeId, userId } = req.body;
    try {
        const favouriteRecipe = await prismaClient.favouriteRecipes.create({
            data: {
                userId: userId,
                recipeId: recipeId
            }
        });
        return res.status(201).json(favouriteRecipe) as any;
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong"
        });
    }
};

export const deleteFavouriteRecipeHandler = async (req: Request, res: Response) => {
    const { recipeId, userId } = req.body;
    try {
        await prismaClient.favouriteRecipes.deleteMany({
            where: {
                userId: userId,
                recipeId: recipeId
            }
        });
        return res.status(204).send() as any;
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong"
        });
    }
};