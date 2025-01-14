import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    const { name, email, password, dob, gender } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Name, email, and password are required.'
        });
    }

    try {
        // For Creating the user
        const user = await User.create({ name, email, password, dob, gender });
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        // For Handling duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists. Please use a different email.'
            });
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error mate',
                errors: Object.values(error.errors).map((err) => err.message)
            });
        }

        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred mate'
        });
    }
});


authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials mate' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ success: true, message: 'User logged in successfully mate', token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


export default authRouter;
