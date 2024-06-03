import express from "express";
import nedb from "nedb-promises";

// Initialize databases
const menuDB = new nedb({ filename: "airbean.db", autoload: true });

const checkIfCoffeeSoldOut = async (req, res, next) => {
  try {
    const { _id } = req.body;

    console.log(`Checking if coffee with id ${_id} is sold out`);
    const coffeeItem = await menuDB.findOne({ _id });

    if (!coffeeItem) {
      console.log(`Coffee with id ${_id} not found in menu`);
      return res.status(404).send("Item not found in menu");
    }

    if (coffeeItem.soldOut) {
      console.log(`Coffee with id ${_id} is sold out`);
      return res.status(400).send("Coffee is sold out");
    }

    req.menuItem = coffeeItem; // Store the menu item in request object
    next();
  } catch (error) {
    console.error("Error checking coffee sold out status:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default checkIfCoffeeSoldOut;


// import express from "express";
// import nedb from "nedb-promises";
// import { cartDB } from "./cart.js";
// import { orderDB } from "./order.js";
// import {airbeanDB} from "./airbean.db";


// // Initialize databases
// const menuDB = new nedb({ filename: "airbean.db", autoload: true });
// // const orderDB = new nedb({ filename: "orders.db", autoload: true }); // Added orderDB

// const router = express.Router();

// // Middleware to check if coffee is sold out
// const checkIfCoffeeSoldOut = async (req, res, next) => {
//   try {
//     const { id } = req.body;

//     console.log(`Checking if coffee with id ${id} is sold out`);
//     const coffeeItem = await menuDB.findOne({ _id: id });

//     if (coffeeItem && coffeeItem.soldOut) {
//       console.log(`Coffee with id ${id} is sold out`);
//       return res.status(400).send("Coffee is sold out");
//     }

//     next();
//   } catch (error) {
//     console.error("Error checking coffee sold out status:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// export default checkIfCoffeeSoldOut




// Route to add a coffee item to an order with middleware
// router.post("/add-to-order", checkIfCoffeeSoldOut, async (req, res) => {
//   try {
//     const newOrderItem = req.body;
//     console.log(`Adding new order item: ${JSON.stringify(newOrderItem)}`);

//     const createdOrderItem = await orderDB.insert(newOrderItem);

//     res.status(201).json(createdOrderItem); // Return the created order item
//   } catch (error) {
//     console.error("Error adding to order:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

