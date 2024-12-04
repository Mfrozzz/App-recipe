import Recipe from "../model/Recipe";

const AddFavouriteRecipeService = async (recipe:Recipe) =>{
    const urlBase = new URL("http://localhost:5000/api/recipe/favourite");
    const req = {
        recipeId: recipe.id
    }

    const res = await fetch(urlBase,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    });
    if(!res.ok){
        throw new Error("Failed to save favourite recipe");
    }
}

export { AddFavouriteRecipeService };