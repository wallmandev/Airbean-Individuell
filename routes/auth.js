import { Router } from "express";
import userSchema from "../models/userModel.js";
import nedb from 'nedb-promises';

const router = Router();
const usersDB = nedb.create('users.db');

// Middleware function for authentication
const authenticate = async (req, res, next) => {
    const userId = req.headers.authorization;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: Please log in' });
    }

    const user = await usersDB.findOne({ _id: userId });

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized: Invalid user ID' });
    }

    req.user = user;
    next();
};

// Middleware function for checking admin role
const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden: You do not have the necessary permissions' });
    }
};

// Route for user registration
router.post('/register', async (req, res) => {
    // Registration logic here
});

// Route for user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await usersDB.findOne({ username, password });

        if (user) {
            // If user is found, return success message
            return res.json({ success: true, message: 'Login successful', user });
        } else {
            // If user is not found, return error message
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
});

export { router as authRouter, authenticate, checkAdmin };