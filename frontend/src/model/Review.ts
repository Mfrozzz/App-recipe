export default interface Review {
    id: number;
    userId: number;
    recipeId: number;
    rating?: number;
    comment?: string;
    date?: string;
    user?: { name: string };
    averageRating: number;
}