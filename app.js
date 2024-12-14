const express = require('express');
const app = express();
const port = 3000;

const productsRouter = require('./routes/products');

app.use(express.json());

app.use('/products', productsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
