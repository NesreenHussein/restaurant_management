const express = require('express');
const router = express.Router();
const openDb = require('../db');

router.get('/', async (req, res) => {
    const db = await openDb();
    const orders = await db.all('SELECT * FROM orders');
    res.json(orders);
});

router.post('/', async (req, res) => {
    const { table_number, total_price, menu_items } = req.body;
    const db = await openDb();
    const result = await db.run('INSERT INTO orders (table_number, total_price) VALUES (?, ?)', [table_number, total_price]);
    const orderId = result.lastID;

    for (const item of menu_items) {
        await db.run('INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES (?, ?, ?)', [orderId, item.menu_item_id, item.quantity]);
    }
    res.json({ message: 'Order created', orderId });
});

module.exports = router;
