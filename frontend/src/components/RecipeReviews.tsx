import Review from "../model/Review";
import { AddReviewService } from "../service/AddReviewService";
import { GetReviewsByRecipeService } from "../service/GetReviewsByRecipeService";
import { useEffect, useState } from "react";

interface Props {
    recipeId: number;
    userId: number;
    user: { name: string };
}

function RecipeReviews({ recipeId, userId, user:{ name }} : Props) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [newRating, setNewRating] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await GetReviewsByRecipeService(recipeId);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [recipeId]);

    const handleAddReview = async () => {
        if (!newComment.trim() || newRating === 0) return;

        setLoading(true);
        try {
            const newReview = {
                recipeId: recipeId,
                userId: userId,
                rating: newRating,
                comment: newComment,
            };

            const response = await AddReviewService(newReview);
            setReviews([response, ...reviews]);
            setNewComment("");
            setNewRating(0);
        } catch (error) {
            console.error("Error adding review:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <p>test</p>
        </div>
    );

}

export default RecipeReviews;