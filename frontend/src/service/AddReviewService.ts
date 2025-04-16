import Review from "../model/Review";

const AddReviewService = async (review: { recipeId: number; userId: number; rating: number; comment: string }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token not found");
    }

    const urlBase = new URL("http://localhost:5000/api/recipe/review");

    const req = {
        recipeId: review.recipeId,
        userId: review.userId,
        rating: review.rating,
        comment: review.comment,
    };

    const res = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(req),
    });

    if (!res.ok) {
        throw new Error("Failed to add review");
    }

    return await res.json();
};

export { AddReviewService };