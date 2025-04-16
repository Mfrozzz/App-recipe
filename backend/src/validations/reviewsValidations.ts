import Joi from "joi";

export const createReviewSchema = Joi.object({
    recipeId: Joi.number().required().messages({
        'number.base': 'Recipe ID must be a number',
        'any.required': 'Recipe ID is required',
    }),
    userId: Joi.number().required().messages({
        'number.base': 'User ID must be a number',
        'any.required': 'User ID is required',
    }),
    rating: Joi.number().min(1).max(5).required().messages({
        'number.base': 'Rating must be a number',
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating must be at most 5',
        'any.required': 'Rating is required',
    }),
    comment: Joi.string().min(3).max(500).messages({
        'string.min': 'Comment must be at least 3 characters long',
        'string.max': 'Comment must be at most 500 characters long',
    })
});