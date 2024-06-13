import { Router } from 'express';
import { campaignDB, menuDB } from '../databases/databases.js';
import { authenticate, checkAdmin } from './auth.js';

const router = Router();

// Middleware to validate that the products exist
const validateCampaignProducts = async (req, res, next) => {
    try {
        const { products } = req.body;

        // Fetch all products that match the given product IDs
        const menuItems = await menuDB.find({ _id: { $in: products } });

        // Check if the number of found products matches the number of given product IDs.
        if (menuItems.length !== products.length) {
            return res.status(400).json({ error: 'En eller flera produkter finns inte i menyn' });
        }

        next();
    } catch (error) {
        console.error("Error validating campaign products:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Route to create a campaign
router.post('/create', authenticate, checkAdmin, validateCampaignProducts, async (req, res) => {
    try {
        const { products, price } = req.body;

        // Create a new campaign
        const newCampaign = await campaignDB.insert({ products, price });
        console.log("New campaign created:", newCampaign);

        res.status(201).json(newCampaign);
    } catch (error) {
        console.error("Error creating campaign:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;