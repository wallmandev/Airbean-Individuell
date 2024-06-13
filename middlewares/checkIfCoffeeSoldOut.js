// checkIfCoffeeSoldOut.js
import { menuDB } from '../databases/databases.js';

const checkIfCoffeeSoldOut = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Produktens id måste anges.' });
    }

    // Fetch product from menu
    const menuItem = await menuDB.findOne({ id });

    if (!menuItem) {
      return res.status(404).json({ error: 'Produkten finns inte i menyn.' });
    }

    // Check if product is out of sale
    if (menuItem.soldOut) {
      return res.status(409).json({ error: 'Produkten är slutsåld.' });
    }

    
    req.menuItem = menuItem;
    next();
  } catch (error) {
    console.error("Error checking if coffee is sold out:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default checkIfCoffeeSoldOut;