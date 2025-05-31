import express from 'express';
import { signupValidationRules, validateSignup } from '../middlewares/signupValidation.js';
import { loginValidationRules, validateLogin } from '../middlewares/loginValidation.js';
import { userSignup, vendorSignup } from '../controllers/signupController.js';
import { userLogin, vendorLogin } from '../controllers/loginController.js'; // Import the login controllers
import { LoginController } from '../controllers/loginController.js';

const router = express.Router();

// Signup routes
router.post('/signup/user', signupValidationRules, validateSignup, userSignup);
router.post('/signup/vendor', signupValidationRules, validateSignup, vendorSignup);

// Login routes
router.post('/login/user', loginValidationRules, validateLogin, userLogin); 
router.post('/login/vendor', loginValidationRules, validateLogin, vendorLogin); 

export default router;
