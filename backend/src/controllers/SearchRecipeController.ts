import { query } from "express";

const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page:number) =>{

    if(!apiKey){
        throw new Error("API key not found.");
    }

    const base_Url = "https://api.spoonacular.com/recipes/complexSearch"
    const url = new URL(base_Url);

    const queryParams = {
        apiKey,
        query : searchTerm,
        number: "8",
        offset: (page*10).toString()
    }

    url.search = new URLSearchParams(queryParams).toString();

    try{
        const searchResponse = await fetch(url.toString());
        const resultJson = await searchResponse.json();
        return resultJson;
    }catch(error){
        console.error(error);
    }
};