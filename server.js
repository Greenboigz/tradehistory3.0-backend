const helpers = require('./helpers/helper');

const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

const products = helpers.load_products();
const purchases = helpers.load_purchases(products);

app.use(cors())

// create a GET route
app.get('/products', (req, res) => {
    res.send({ products });
});

app.post('/products', (req, res) => {
    console.log(res.body);
    res.send({ productId: 1234 });
})

app.get('/purchases', (req, res) => {
    res.send({ purchases });
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));