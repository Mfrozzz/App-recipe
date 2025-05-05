import { AddReviewService } from "../service/AddReviewService";
import { GetReviewsByRecipeService } from "../service/GetReviewsByRecipeService";
import { useEffect, useState } from "react";
import styles from "../pages/css/RecipesPage.module.css";
import { GetUserInfoService } from "../service/GetUserInfoService";
import User from "../model/User";
import { GetUserByIdService } from "../service/GetUserByIdService";

interface Review {
    userName: string;
    id: number;
    recipeId: number;
    userId: number;
    rating: number;
    comment: string;
    date: string;
}

interface Props {
    recipeId: number;
    userId: number;
}

function RecipeReviews({ recipeId, userId }: Props) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [newRating, setNewRating] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [averageRating, setAverageRating] = useState<number | null>(null);

    useEffect(() => {
        const fetchReviewsWithUserNames = async () => {
            try {
                const response = await GetReviewsByRecipeService(recipeId);
                
                if (!response || !Array.isArray(response.reviews)) {
                    console.error("Invalid response format:", response);
                    setReviews([]);
                    setAverageRating(null);
                    return;
                }

                const reviewsWithUserNames = await Promise.all(
                    response.reviews.map(async (review: Review) => {
                        try {
                            const user = await GetUserByIdService(review.userId);
                            return { ...review, userName: user.name }; 
                        } catch (error) {
                            console.error(`Error fetching user with ID ${review.userId}:`, error);
                            return { ...review, userName: "Unknown" }; 
                        }
                    })
                );
                setReviews(reviewsWithUserNames);
                setAverageRating(response.averageRating);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviewsWithUserNames();
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
            const updatedResponse = await GetReviewsByRecipeService(recipeId); // Recarrega a média do backend
            setAverageRating(updatedResponse.averageRating);
            setNewComment("");
            setNewRating(0);
        } catch (error) {
            console.error("Error adding review:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStarClick = (rating: number) => {
        setNewRating(rating);
    };

    return (
        <div className={styles.reviewsContainer}>
            <h3>Reviews</h3>
            {averageRating !== null && (
                <div className={styles.averageRating}>
                    <strong>Average Rating:</strong>{" "}
                    <span className={styles.stars}>
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className={`${styles.star} ${index < Math.round(averageRating) ? styles.filled : ""}`}
                            >
                                ★
                            </span>
                        ))}
                    </span>
                    ({averageRating.toFixed(1)})
                </div>
            )}
            <div className={styles.addReview}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className={styles.textarea}
                />
                <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`${styles.star} ${newRating >= star ? styles.filled : ""}`}
                            onClick={() => handleStarClick(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <button onClick={handleAddReview} disabled={loading} className={styles.button}>
                    {loading ? "Posting..." : "Post Review"}
                </button>
            </div>
            <ul className={styles.reviewList}>
                {reviews.map((review) => (
                <li key={review.id} className={styles.reviewItem}>
                    <strong>{review.userName || "Unknown"}</strong> - 
                    <span className={styles.stars}>
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className={`${styles.star} ${index < review.rating ? styles.filled : ""}`}
                            >
                                ★
                            </span>
                        ))}
                    </span>
                    <p>{review.comment}</p>
                    <small>{new Date(review.date).toLocaleDateString()}</small>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeReviews;