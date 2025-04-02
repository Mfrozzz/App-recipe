import { Router } from 'express';
import { searchRecipesHandler, getRecipeSummaryHandler, getFavouriteRecipesHandler, addFavouriteRecipeHandler, deleteFavouriteRecipeHandler } from '../controllers/recipeController';
import { signupHandler, loginHandler, requestPasswordResetHandler, resetPasswordHandler, getUserInfoHandler, updateUserInfoHandler } from '../controllers/userController';
import validateRequest from '../middlewares/validateRequest';
import { requestPasswordResetSchema, resetPasswordSchema, signInSchema, signUpSchema, updateUserInfoSchema } from '../validations/userValidation';
import { addFavoriteRecipeSchema, deleteFavoriteRecipeSchema } from '../validations/recipeValidations';

const router = Router();

router.get("/api/recipe/search", searchRecipesHandler);
router.get("/api/recipe/:recipeId/summary", getRecipeSummaryHandler);
router.get("/api/recipe/favourite/:userId", getFavouriteRecipesHandler);
router.post("/api/recipe/favourite", validateRequest(addFavoriteRecipeSchema), addFavouriteRecipeHandler);
router.post("/api/recipe/signup", validateRequest(signUpSchema), signupHandler);
router.post("/api/recipe/login", validateRequest(signInSchema), loginHandler);
router.delete("/api/recipe/favourite", validateRequest(deleteFavoriteRecipeSchema), deleteFavouriteRecipeHandler);

router.post("/api/recipe/requestPasswordReset", validateRequest(requestPasswordResetSchema), requestPasswordResetHandler);
router.post("/api/recipe/resetPassword", validateRequest(resetPasswordSchema), resetPasswordHandler);
router.get("/api/recipe/user/info", getUserInfoHandler);
router.put("/api/recipe/user/info", validateRequest(updateUserInfoSchema), updateUserInfoHandler);

export default router;