const express = require('express');
const router = express.Router();
const openDb = require('../db');

router.get('/', async (req, res) => {
    const db = await openDb();
    const menu = await db.all('SELECT * FROM menu_items');
    res.json(menu);
});

router.post('/', async (req, res) => {
    const { name, description, price, ingredients } = req.body;
    const db = await openDb();
    const result = await db.run('INSERT INTO menu_items (name, description, price) VALUES (?, ?, ?)', [name, description, price]);
    const menuItemId = result.lastID;

    for (const ingredient of ingredients) {
        await db.run('INSERT INTO menu_item_ingredients (menu_item_id, inventory_item_id, quantity) VALUES (?, ?, ?)', [menuItemId, ingredient.inventory_item_id, ingredient.quantity]);
    }
    res.json({ message: 'Menu item added', menuItemId });
});

module.exports = router;
