import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nedb from "nedb-promises"
import errorHandler from "./middlewares/errorHandler.js";


const database = new nedb ({filename: "airbean.db", autoload: true});

// const users = [
//     {id: 1, username: 'admin', password: 'admin'},
// ]

// const menu = [
//     {
//         "id":1,
//         "title":"Bryggkaffe",
//         "desc":"Bryggd på månadens bönor.",
//         "price":39
//       },
//       {
//         "id":2,
//         "title":"Caffè Doppio",
//         "desc":"Bryggd på månadens bönor.",
//         "price":49
//       },
//       {
//         "id":3,
//         "title":"Cappuccino",
//         "desc":"Bryggd på månadens bönor.",
//         "price":49
//       },
//       {
//         "id":4,
//         "title":"Latte Macchiato",
//         "desc":"Bryggd på månadens bönor.",
//         "price":49
//       },
//       {
//         "id":5,
//         "title":"Kaffe Latte",
//         "desc":"Bryggd på månadens bönor.",
//         "price":54
//       },
//       {
//         "id":6,
//         "title":"Cortado",
//         "desc":"Bryggd på månadens bönor.",
//         "price":39
//       }
// ]
// database.insert(menu)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

global.currentUser = null
app.get('/error', (req, res, next) => {
    const error = new Error('page not found')
    error.status = 404;
    next(error)
})

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

app.use(errorHandler)
