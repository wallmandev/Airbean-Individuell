//databases.js
import nedb from 'nedb-promises';

export const cartDB = new nedb({ filename: 'cart.db', autoload: true });
export const menuDB = new nedb({ filename: 'menu.db', autoload: true });
export const orderHistoryDB = new nedb({ filename: 'orderHistory.db', autoload: true });
export const campaignDB = new nedb({ filename: 'campaigns.db', autoload: true });
