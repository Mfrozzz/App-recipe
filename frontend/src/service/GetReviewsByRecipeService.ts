const GetReviewsByRecipeService = async (recipeId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token not found");
    }

    const urlBase = new URL(`http://localhost:5000/api/recipe/review/${recipeId}`);

    const res = await fetch(urlBase, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch reviews");
    }

    return await res.json();
};

export { GetReviewsByRecipeService };