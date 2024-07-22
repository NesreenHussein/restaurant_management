const express = require('express');
const bodyParser = require('body-parser');
const { createOrderTable } = require('./models/order');
const { createInventoryTable } = require('./models/inventory');
const { createReservationTable } = require('./models/reservation');
const { createMenuTable } = require('./models/menu');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/orders', require('./routes/order'));
app.use('/inventory', require('./routes/inventory'));
app.use('/reservations', require('./routes/reservation'));
app.use('/menu', require('./routes/menu'));

(async () => {
    await createOrderTable();
    await createInventoryTable();
    await createReservationTable();
    await createMenuTable();

    app.listen(port, () => {
        console.log(`Restaurant management system listening at http://localhost:${port}`);
    });
})();
