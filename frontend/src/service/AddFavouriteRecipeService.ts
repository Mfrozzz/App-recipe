import Recipe from "../model/Recipe";
import User from "../model/User";

const AddFavouriteRecipeService = async (recipe: Recipe, user: User) => {
    const urlBase = new URL("http://localhost:5000/api/recipe/favourite");

    const req = {
        userId: user.id,
        recipeId: recipe.id
    }

    const res = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    });
    if (!res.ok) {
        throw new Error("Failed to save favourite recipe");
    }
}

export { AddFavouriteRecipeService };