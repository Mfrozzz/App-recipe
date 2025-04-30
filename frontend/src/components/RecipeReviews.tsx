import { AddReviewService } from "../service/AddReviewService";
import { GetReviewsByRecipeService } from "../service/GetReviewsByRecipeService";
import { useEffect, useState } from "react";
import styles from "../pages/css/RecipesPage.module.css";
import { GetUserInfoService } from "../service/GetUserInfoService";

interface Review {
    id: number;
    recipeId: number;
    userId: number;
    rating: number;
    comment: string;
    date: string;
    user: { name: string };
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

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const data = await GetUserInfoService(token);
                    setUser(data);
                } catch (err) {
                    console.error("Error fetching user info:", err);
                }
            }
        };
        fetchUserInfo();

    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await GetReviewsByRecipeService(recipeId);
                setReviews(response.data || []);
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
        <div className={styles.reviewsContainer}>
            <h3>Reviews</h3>
            <div className={styles.addReview}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className={styles.textarea}
                />
                <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className={styles.select}
                >
                    <option value={0}>Select Rating</option>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <option key={star} value={star}>
                            {star} Star{star > 1 ? "s" : ""}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddReview} disabled={loading} className={styles.button}>
                    {loading ? "Posting..." : "Post Review"}
                </button>
            </div>
            <ul className={styles.reviewList}>
                {reviews.map((review) => (
                    <li key={review.id} className={styles.reviewItem}>
                        <strong>{review.user?.name}</strong> - {review.rating} Star{review.rating > 1 ? "s" : ""}
                        <p>{review.comment}</p>
                        <small>{new Date(review.date).toLocaleDateString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeReviews;