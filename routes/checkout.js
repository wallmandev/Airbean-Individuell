import { Router } from 'express';
import nedb from 'nedb-promises';
import { cartDB } from './cart.js';


const orderHistoryDB = new nedb({ filename: 'orderhistory.db', autoload: true });

const router = Router();

// Route to move items from cart to order history
router.post('/checkout', async (req, res) => {
    try {
        // Hämta innehållet från cart.db
        const cartItems = await cartDB.find({});

        // Spara innehållet i orderhistorik.db
        await orderHistoryDB.insert(cartItems);

        // Töm cart.db
        await cartDB.remove({}, { multi: true });

        // Skicka ett svar till klienten
        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error("Error processing checkout:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;








