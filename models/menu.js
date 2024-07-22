const openDb = require('../db');

async function createMenuTable() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS menu_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            price REAL
        )
    `);
    await db.exec(`
        CREATE TABLE IF NOT EXISTS menu_item_ingredients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            menu_item_id INTEGER,
            inventory_item_id INTEGER,
            quantity INTEGER,
            FOREIGN KEY (menu_item_id) REFERENCES menu_items(id),
            FOREIGN KEY (inventory_item_id) REFERENCES inventory(id)
        )
    `);
}

module.exports = { createMenuTable };
