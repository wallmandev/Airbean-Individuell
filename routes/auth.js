import { Router } from "express";
import userSchema from "../models/userModel.js";
import nedb from 'nedb-promises'

const usersDB = new nedb({ filename: 'users.db', autoload: true });
const router = Router();

router.post('/login', async (req, res) => {
    try {
        console.log(req.body.username)
        const { error } = userSchema.validate(req.body)
        if(error) {
            return res.status(400).json({success: false, message: error.details[0].message, status: 400})

        }
        const { username, password } = req.body
        const user = await usersDB.findOne({ username: username, password: password })
        console.log(username)

        if(user) {
            global.currentUser = user;
            return res.json({success: true, message: "Login successful", user: user})
        } else {
            return res.status(400).json({success: false, message: "Invalid credentials" })
        }
        
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error login post", error: error})
     }
});

router.post('/register', async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message, status: 400 })
        }
        const { username, password } = req.body
        const user = await usersDB.findOne({ username: username, password: password })

        if(user) {
            return res.status(400).json({success: false, message: "User already exists"})

        } else {
            await usersDB.insert({ username: username, password: password })
            return res.json({success: true, message: "Registration successful"})
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error register post", error: error})
    }
})


export default router