import dotenv from "dotenv";
import { url } from "inspector";

dotenv.config();
const apiKey = process.env.API_KEY;

export const getRecipeSummary = async (recipeId: string) => {
    if (!apiKey) {
        throw new Error("API key not found.");
    }
    const urlBase = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);
    const params = {
        apiKey: apiKey
    }
    urlBase.search = new URLSearchParams(params).toString();
    const response = await fetch(urlBase);
    const responseJson = await response.json();
    return responseJson;
}