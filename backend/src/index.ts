import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { searchRecipes } from "./controllers/SearchRecipeController";
import { getRecipeSummary } from "./controllers/GetRecipeSummaryController";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/recipe/search", async (req, res) => {
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);
    const results = await searchRecipes(searchTerm, page);
    return res.json(results) as any;
});

app.get("/api/recipe/:recipeId/summary", async (req, res)=>{
    const recipeId = req.params.recipeId;
    const results = await getRecipeSummary(recipeId);
    return res.json(results) as any;
});

app.post("/api/recipes/favourite", async (req,res)=>{
    const recipeId = req.body.recipeId;
    try{
        const favouriteRecipe = await prismaClient.favouriteRecipes.create(
            {
                data: {
                    recipeId: recipeId
                }
            }
        );
        return res.status(201).json(favouriteRecipe) as any;
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server Running on http://localhost:${process.env.PORT}`);
    console.log(`Endpoints that you can test:`);
    console.log(`Get -> Search Recipe: http://localhost:${process.env.PORT}/api/recipe/search?searchTerm={searchTerm}&page={page}`);
    console.log(`Get -> Recipe Summary: http://localhost:${process.env.PORT}/api/recipe/{recipeId}/summary`);
});