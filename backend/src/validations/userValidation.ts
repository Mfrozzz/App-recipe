import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(40).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 40 characters long',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
    }),
});

export const signInSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
    })
});

export const requestPasswordResetSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
    })
});

export const resetPasswordSchema = Joi.object({
    token: Joi.string().required().messages({
        'string.empty': 'Token is required',
    }),
    newPassword: Joi.string().min(6).required().messages({
        'string.empty': 'New password is required',
        'string.min': 'New password must be at least 6 characters long',
    })
});

export const updateUserInfoSchema = Joi.object({
    name: Joi.string().min(3).max(40).optional().messages({
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 40 characters long',
    }),
    email: Joi.string().email().optional().messages({
        'string.email': 'Email must be a valid email address',
    })
});