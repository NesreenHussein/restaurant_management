const openDb = require('../db');

async function createInventoryTable() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            quantity INTEGER,
            unit_price REAL,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

module.exports = { createInventoryTable };
