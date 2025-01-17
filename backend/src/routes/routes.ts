import { Router } from 'express';
import { searchRecipesHandler, getRecipeSummaryHandler, getFavouriteRecipesHandler, addFavouriteRecipeHandler, deleteFavouriteRecipeHandler } from '../controllers/recipeController';
import { signupHandler, loginHandler, requestPasswordResetHandler, resetPasswordHandler } from '../controllers/userController';

const router = Router();

router.get("/api/recipe/search", searchRecipesHandler);
router.get("/api/recipe/:recipeId/summary", getRecipeSummaryHandler);
router.get("/api/recipe/favourite", getFavouriteRecipesHandler);
router.post("/api/recipe/favourite", addFavouriteRecipeHandler);
router.post("/api/recipe/signup", signupHandler);
router.post("/api/recipe/login", loginHandler);
router.delete("/api/recipe/favourite", deleteFavouriteRecipeHandler);

router.post("/api/recipe/requestPasswordReset", requestPasswordResetHandler);
router.post("/api/recipe/resetPassword", resetPasswordHandler);

export default router;