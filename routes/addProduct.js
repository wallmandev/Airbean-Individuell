// Route to add a new product to the menu
import { Router } from 'express';
import { menuDB } from '../databases/databases.js';
import { authenticate, checkAdmin } from './auth.js';
import validateProduct from '../middlewares/validateProduct.js';
import createdAt from '../middlewares/createdAt.js';

const router = Router();

router.post('/', authenticate, checkAdmin, validateProduct, createdAt, async (req, res) => {
    try {
        const { id, title, desc, price, createdAt } = req.body;

        // Check if the product already exists in the menu
        const existingProduct = await menuDB.findOne({ id });

        if (existingProduct) {
            return res.status(409).json({ error: 'Product already exists in the menu.' });
        }

        // Add the new product to the menu
        const newProduct = await menuDB.insert({ id, title, desc, price, createdAt });
        console.log("Added product to menu:", newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error adding product to menu:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;