import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Vendor from '../models/vendor.js';
import { validationResult } from 'express-validator';




// Controller for handling user login
export const userLogin = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find the user account
        const user = await User.findOne({ email });

        // If user does not exist
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Respond with the token
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for handling vendor login
export const vendorLogin = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find the vendor account
        const vendor = await Vendor.findOne({ email });

        // If vendor does not exist
        if (!vendor) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, vendor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: vendor._id, role: 'vendor' }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Respond with the token
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during vendor login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
