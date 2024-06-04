//db.js
import nedb from 'nedb-promises';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const usersDB = nedb.create({
  filename: path.join(dirname, 'users.db'),
  autoload: true
});

const orderHistoryDB = new nedb({ filename: 'orderhistory.db', autoload: true });


export { usersDB, orderHistoryDB };