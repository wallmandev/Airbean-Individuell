// import { Router } from "express";
// import nedb from 'nedb-promises'


// const db = new nedb({ filename: 'airbean.db', autoload: true });
// const varukorgDB = new nedb({ filename: 'varukorg.db', autoload: true });
// const router = Router();

// // Route to get all menu items
// router.get('/', async (req, res) => {
//     try {
//       const menuItems = await db.find({});
//       console.log("All menu items:", menuItems);
//       res.json(menuItems);
//     } catch (error) {
//       console.error("Error fetching menu items:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   });


// // Route to get a specific menu item by id
// router.get('/:id', async (req, res) => {
//     try {
//       const itemId = req.params.id;
//       let menuItem = await db.findOne({ _id: itemId });
  
//       if (!menuItem) {
//         menuItem = await db.findOne({ id: parseInt(itemId) });
//       }
  
//       if (menuItem) {
//         console.log("Menu item:", menuItem);
//         res.json(menuItem);
//       } else {
//         res.status(404).send("Menu item not found");
//       }
//     } catch (error) {
//       console.error("Error fetching menu item:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   });



// // Route to add an item to the cart
// router.post('/cart', async (req, res) => {
//     try {
//       const cartItem = req.body;
//       cartItem.type = 'cartItem'; // Lägg till en typ för att särskilja varukorgsobjekt
//       const newCartItem = await varukorgDB.insert(cartItem);
//       console.log("Added to cart:", newCartItem);
//       res.status(201).json(newCartItem);
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   });
  
//   // Route to get all items in the cart
//   router.get('/cart', async (req, res) => {
//     try {
//       const cartItems = await varukorgDB.find({ type: 'cartItem' });
//       console.log("All cart items:", cartItems);
//       res.json(cartItems);
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   });
  
//   export default router;


import { Router } from 'express';
import nedb from 'nedb-promises';

const menuDB = new nedb({ filename: 'airbean.db', autoload: true });


const router = Router();

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

// Route to get a specific menu item by id
router.get('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    let menuItem = await menuDB.findOne({ _id: itemId });

    if (!menuItem) {
      menuItem = await menuDB.findOne({ id: parseInt(itemId) });
    }

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

// Route to add an item to the cart
// router.post('/cart', async (req, res) => {
//   try {
//     const cartItem = req.body;
//     const newCartItem = await cartDB.insert(cartItem);
//     console.log("Added to cart:", newCartItem);
//     res.status(201).json(newCartItem);
//   } catch (error) {
//     console.error("Error adding item to cart:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Route to get all items in the cart
// router.get('/cart', async (req, res) => {
//   try {
//     const cartItems = await cartDB.find({});
//     console.log("All cart items:", cartItems);
//     res.json(cartItems);
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

export default router;

