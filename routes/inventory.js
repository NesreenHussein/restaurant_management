const express = require('express');
const router = express.Router();
const openDb = require('../db');

router.get('/', async (req, res) => {
    const db = await openDb();
    const inventory = await db.all('SELECT * FROM inventory');
    res.json(inventory);
});

router.post('/', async (req, res) => {
    const { name, quantity, unit_price } = req.body;
    const db = await openDb();
    await db.run('INSERT INTO inventory (name, quantity, unit_price) VALUES (?, ?, ?)', [name, quantity, unit_price]);
    res.json({ message: 'Inventory item added' });
});

module.exports = router;
