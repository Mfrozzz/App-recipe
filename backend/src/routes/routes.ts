import { Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { searchRecipes } from "../controllers/SearchRecipeController";
import { getRecipeSummary } from "../controllers/GetRecipeSummaryController";
import { PrismaClient } from "@prisma/client";
import { getFavouriteRecipesByIds } from "../controllers/GetFavouriteRecipesByIds";

dotenv.config();
const router = Router();
const prismaClient = new PrismaClient();
const generateToken = (userId: number) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY!, { expiresIn: '1h' });
};

router.get("/api/recipe/search", async (req, res) => {
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);
    const results = await searchRecipes(searchTerm, page);
    return res.json(results) as any;
});

router.get("/api/recipe/:recipeId/summary", async (req, res) => {
    const recipeId = req.params.recipeId;
    const results = await getRecipeSummary(recipeId);
    return res.json(results) as any;
});

router.get("/api/recipe/favourite", async (req, res) => {
    try {
        const favouriteRecipes = await prismaClient.favouriteRecipes.findMany();
        const recipeIds = favouriteRecipes.map((recipe) => recipe.recipeId.toString());
        const favourites = await getFavouriteRecipesByIds(recipeIds);
        return res.json(favourites) as any;
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong"
        });
    }
});

router.post("/api/recipe/favourite", async (req, res) => {
    const recipeId = req.body.recipeId;
    try {
        const favouriteRecipe = await prismaClient.favouriteRecipes.create(
            {
                data: {
                    recipeId: recipeId
                }
            }
        );
        return res.status(201).json(favouriteRecipe) as any;
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong"
        });
    }
});

router.delete("/api/recipe/favourite", async (req, res) => {
    const recipeId = req.body.recipeId;
    try {
        await prismaClient.favouriteRecipes.delete({
            where: {
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
});

router.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    try {
        const user = await prismaClient.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        const token = generateToken(user.id);
        return res.json({ token }) as any;
    } catch (error) {
        return res.status(400).json({ error: 'User already exists' });
    }
});

router.post('/api/login', async (req, res) => {
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
});

export default router;