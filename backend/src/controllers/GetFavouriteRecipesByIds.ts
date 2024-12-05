import dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.API_KEY;

export const getFavouriteRecipesByIds = async (ids: string[]) => {
    if (!apiKey) {
        throw new Error("API key not found.");
    }

    const urlBase = new URL("https://api.spoonacular.com/recipes/informationBulk");
    const params = {
        apiKey: apiKey,
        ids: ids.join(",")
    }

    urlBase.search = new URLSearchParams(params).toString();
    const searchResponse = await fetch(urlBase);
    const json = await searchResponse.json();
    return { results: json }
}