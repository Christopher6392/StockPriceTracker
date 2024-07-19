const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const generateRandomPrice = () => {
    return (Math.random() * 100).toFixed(2);
}

const stocks = [
    { name: 'Stock A', price: generateRandomPrice() },
    { name: 'Stock B', price: generateRandomPrice() },
];

app.use(cors());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/api/stocks', (req, res) => {
    res.json(stocks);
});

app.get('/api/stocks/:name', (req, res) => {
    const stock = stocks.find(stock => stock.name === req.params.name);
    stock.price = generateRandomPrice();
    res.json(stock);
});