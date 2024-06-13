import { Router } from 'express';
import { menuDB } from '../databases/databases.js';
import validateProduct from '../middlewares/validateProduct.js';
import { authenticate, checkAdmin } from './auth.js';

const router = Router();

// Route to get a specific menu item by id
router.get('/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      const menuItem = await menuDB.findOne({ _id: itemId });
  
      if (menuItem) {
        console.log("Menu item:", menuItem);
        res.json(menuItem);
      } else {
        res.status(404).send("Menu item not found");
      }
    } catch (error) {
      console.error("Error fetching menu item:", error);
      res.status(500).send("Internal Server Error");
    }
  });

// Route to get all menu items
router.get('/', async (req, res) => {
    try {
      const menuItems = await menuDB.find({});
      console.log("All menu items:", menuItems);
      res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).send("Internal Server Error");
    }
  });

// Route to update a product in the menu
router.put('/:id', authenticate, checkAdmin, validateProduct, async (req, res) => {
    try {
        const productId = req.params.id;
        const { title, desc, price } = req.body;
        const modifiedAt = new Date().toISOString();

        // Update the product in the menu
        const numUpdated = await menuDB.update(
            { _id: productId },
            { $set: { title, desc, price, modifiedAt } }
        );

        if (numUpdated === 0) {
            return res.status(404).json({ error: 'Product not found or could not be updated.' });
        }

        // Find the updated product
        const updatedProduct = await menuDB.findOne({ _id: productId });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Updated product not found.' });
        }

        console.log("Updated product:", updatedProduct);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to delete a product from the menu
router.delete('/:id', authenticate, checkAdmin, async (req, res) => {
    try {
        const productId = req.params.id;

        // Check if the product exists in the menu
        const existingProduct = await menuDB.findOne({ _id: productId });

        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found in the menu.' });
        }

        // Delete the product from the menu
        const numRemoved = await menuDB.remove({ _id: productId }, {});

        if (numRemoved === 0) {
            return res.status(404).json({ error: 'Product could not be removed.' });
        }

        console.log("Product removed from menu:", productId);
        res.status(200).json({ success: true, message: "Product removed from menu" });
    } catch (error) {
        console.error("Error removing product from menu:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;