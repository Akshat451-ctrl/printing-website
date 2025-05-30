// Importing necessary functions from 'express-validator'
import { body, validationResult } from 'express-validator';

// Validation rules for signup fields
export const signupValidationRules = [

    body('name')
        .notEmpty()
        .withMessage('name is required')
        .bail()
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters long'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

// Middleware to handle validation errors
export const validateSignup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
