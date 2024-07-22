const openDb = require('../db');

async function createReservationTable() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT,
            table_number INTEGER,
            reservation_time TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

module.exports = { createReservationTable };
