//checkout.js
import { Router } from 'express';
import nedb from 'nedb-promises';
import { cartDB } from './cart.js';
import { orderHistoryDB } from '../databases/databases.js';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const userId = req.headers['user-id'];

        const cartItems = await cartDB.find({});
        console.log("Cart items fetched for checkout:", cartItems);

        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        const order = {
            userId: userId || 'guest',
            items: cartItems,
            date: new Date()
        };

        if (userId) {
            await orderHistoryDB.insert(order);
        }

        await cartDB.remove({}, { multi: true });
        const deliveryTime = Math.floor(Math.random() * 10) + 1;
        res.json({ success: true, message: `Order placed successfully, your coffee will be delivered in: ${deliveryTime} minutes` });
    } catch (error) {
        console.error("Error processing checkout:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;








