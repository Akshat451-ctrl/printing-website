// Importing necessary functions from 'express-validator'
import { body, validationResult } from 'express-validator';

// Validation rules for login fields
const loginValidationRules = [
    // Validate 'email' field
    body('email')
        .notEmpty() // Ensure 'email' is not empty
        .withMessage('Email is required') // Error message if empty
        .isEmail() // Ensure 'email' is in a valid email format
        .withMessage('Invalid email format'), // Error message for invalid format

    // Validate 'password' field
    body('password')
        .notEmpty() // Ensure 'password' is not empty
        .withMessage('Password is required') // Error message if empty
        .isLength({ min: 6 }) // Ensure 'password' has a minimum length of 6
        .withMessage('Password must be at least 6 characters long'), // Error message for length validation
];

// Middleware to handle validation errors
const validateLogin = (req, res, next) => {
    const errors = validationResult(req); // Extract validation errors from the request
    if (!errors.isEmpty()) {
        // If there are validation errors, return a 400 response with the errors
        return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed to the next middleware if no errors
};

// Exporting the validation rules and middleware for use in other files
export { loginValidationRules, validateLogin };