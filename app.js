const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const productsRouter = require('./routes/products.js');
const usersRouter = require("./routes/user.js");

app.use(cors());

app.use(express.json());

app.use('/products', productsRouter);
app.use('/user', usersRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
