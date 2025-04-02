import Joi from "joi";

export const addFavoriteRecipeSchema = Joi.object({
    recipeId: Joi.number().required().messages({
        'number.base': 'Recipe ID must be a number',
        'number.empty': 'Recipe ID is required',
    }),
    userId: Joi.number().required().messages({
        'number.base': 'User ID must be a number',
        'number.empty': 'User ID is required',
    })
});

export const deleteFavoriteRecipeSchema = Joi.object({
    recipeId: Joi.number().required().messages({
        'number.base': 'Recipe ID must be a number',
        'number.empty': 'Recipe ID is required',
    }),
    userId: Joi.number().required().messages({
        'number.base': 'User ID must be a number',
        'number.empty': 'User ID is required',
    })
});