import { Router } from 'express';
import nedb from 'nedb-promises';
import checkIfCoffeeSoldOut from '../middlewares/coffeSoldOut.js';

const cartDB = new nedb({ filename: 'cart.db', autoload: true });
const router = Router();

// Route to add an item to the cart
router.post('/', checkIfCoffeeSoldOut, async (req, res) => {
    try {
        const menuItem = req.menuItem;


        // Kontrollera om det föreslagna objektet finns i menyn
        const menuItem = await menuDB.findOne({ _id: itemId });

        // Om det föreslagna objektet inte finns i menyn, returnera en felstatus

        if (!menuItem) {
            return res.status(404).send("Item not found in menu");
        }

        // Kontrollera om varan redan finns i varukorgen
        const existingCartItem = await cartDB.findOne({ _id: menuItem._id });

        if (existingCartItem) {
            // Uppdatera kvantiteten om varan redan finns i varukorgen
            const updatedCartItem = await cartDB.update(
                { _id: menuItem._id },
                { $inc: { quantity: 1 } },
                { returnUpdatedDocs: true }
            );
            console.log("Updated cart item:", updatedCartItem);
            res.status(200).json(updatedCartItem);
        } else {
            // Lägg till varan i varukorgen med kvantitet 1
            menuItem.quantity = 1;
            const newCartItem = await cartDB.insert(menuItem);
            console.log("Added to cart:", newCartItem);
            res.status(201).json(newCartItem);
        }
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Route to get all items in the cart
router.get('/', async (req, res) => {
    try {
        const cartItems = await cartDB.find({});
        const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

        // Returnera det totala beloppet
        res.json({ cartItems, totalPrice });
        console.log("All cart items:", cartItems);
        // res.json(cartItems);
        
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to delete a specific item from the cart by id
router.delete('/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const numRemoved = await cartDB.remove({ _id: itemId }, {});
        if (numRemoved === 0) {
            res.status(404).send("Item not found in cart");
        } else {
            console.log("Item removed from cart:", itemId);
            res.status(204).end();
        }
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.get('/price', async (req, res) => {



app.get('/price', async (req, res) => {

    try {
        // Läs alla objekt från cart.db
        const cartItems = await cartDB.find({});

        // Extrahera priserna och summera dem
        const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

        // Returnera det totala beloppet
        res.json({ totalPrice });
    } catch (error) {
        console.error("Error fetching prices:", error);
        res.status(500).send("Internal Server Error");
    }
});


export default router;
export { cartDB }