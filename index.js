//index.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middlewares/errorHandler.js";
import cartRouter from "./routes/cart.js";
import { authRouter, authenticate, checkAdmin } from "./routes/auth.js";
import checkoutRouter from "./routes/checkout.js";
import orderHistoryRouter from "./routes/orderHistory.js";
import aboutRouter from "./routes/about.js"
import statusRouter from "./routes/status.js";
import notFoundMiddleware from "./middlewares/urlNotFound.js";
import addProductRouter from "./routes/addProduct.js";
import menuRouter from './routes/menu.js';
import campaignRouter from "./routes/campaign.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

global.currentUser = null;

app.use(express.json());



app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
});

app.use('/menu', menuRouter);
app.use('/cart', cartRouter);
app.use('/auth', authRouter);
app.use('/checkout', checkoutRouter);
app.use('/orderHistory', orderHistoryRouter);
app.use('/about', aboutRouter);
app.use('/status', statusRouter);
app.use('/addProduct', addProductRouter);
app.use('/campaign', campaignRouter);
app.use(notFoundMiddleware)

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));