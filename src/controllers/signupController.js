import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Vendor from '../models/vendor.js';

// Utility function to hash password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Utility function to generate JWT token
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Signup controller for users
export const userSignup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = generateToken(newUser._id);
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

// Signup controller for vendors
export const vendorSignup = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: 'Vendor already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const newVendor = new Vendor({ name, email, password: hashedPassword, phone });
        await newVendor.save();

        const token = generateToken(newVendor._id);
        res.status(201).json({ message: 'Vendor registered successfully', token });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
