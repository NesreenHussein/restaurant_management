const express = require('express');
const router = express.Router();
const openDb = require('../db');

router.get('/', async (req, res) => {
    const db = await openDb();
    const reservations = await db.all('SELECT * FROM reservations');
    res.json(reservations);
});

router.post('/', async (req, res) => {
    const { customer_name, table_number, reservation_time } = req.body;
    const db = await openDb();
    await db.run('INSERT INTO reservations (customer_name, table_number, reservation_time) VALUES (?, ?, ?)', [customer_name, table_number, reservation_time]);
    res.json({ message: 'Reservation created' });
});

module.exports = router;
