const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();


const filePath = path.join(__dirname, "../db/products.json");

const readProductsFromFile = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeProductsToFile = (products) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
};


router.get("/", (req, res) => {
  try {
    const products = readProductsFromFile();
    res.status(200).json(products);
    
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve products" });
    console.error(err);

  }
});

router.post("/add", (req, res) => {
  const products = readProductsFromFile();
  let newProduct = req.body;

  if (!newProduct.id) {
    return res.status(400).json({ error: "id must be filled" });
  }

  const existingProduct = products.find(
    (product) => product.id === newProduct.id
  );
  if (existingProduct) {
    return res.status(400).json({ error: `Product with ID ${newProduct.id} already exists.` });
  }

  if (!newProduct.name) {
    return res.status(400).json({ error: "name must be filled" });
  }

  if (!newProduct.description) {
    return res.status(400).json({ error: "description must be filled" });
  }

  if (!newProduct.price) {
    return res.status(400).json({ error: "price must be filled" });
  }


  const price = parseFloat(newProduct.price);
  if (isNaN(price)) {
    return res.status(400).json({ error: "price must be numeric" });
  }
  newProduct.price = price;

  try {
    products.push(newProduct);
    writeProductsToFile(products);
    res.status(201).json({ success: true, product: newProduct });
    console.log("Added product:", newProduct);
  } catch (err) {
    res.status(500).json({ error: "Internal server error while adding product" });
    console.error(err);
  }
});

router.post('/update', (req, res) => {

  if (!req.body.id) return res.status(400).json({ error: "id must be filled" });

  let changes = req.body;

  let products = readProductsFromFile();
  const productIndex = products.findIndex((product) => product.id === changes.id);

  if (productIndex === -1) {
    return res.status(404).json({ error: `Product with ID ${changes.id} not found` });
  }

  let updatedProduct = products[productIndex];

  if (changes.name) updatedProduct.name = changes.name;
  if (changes.description) updatedProduct.description = changes.description;
  if (changes.price) {
    const price = changes.price;
    if (isNaN(price)) {
      return res.status(400).json({ error: "price must be numeric" });
    }
    updatedProduct.price = price;
  }
  products[productIndex] = updatedProduct;

  try {

    writeProductsToFile(products);
    res.status(200).json({ success: true, product: updatedProduct });
    console.log("Updated product:", updatedProduct);

  } catch (err) {

    res.status(500).json({ error: "Internal server error while updating product" });
    console.error(err);

  }
});



router.post("/delete", (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ error: "id must be filled" });
  }

  let productId = req.body.id;

  if (typeof productId !== "number") {
    return res.status(400).json({ error: "id must be numeric" });
  }

  let products = readProductsFromFile();
 
  const productIndex = products.findIndex((product) => product.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: `Product with ID ${productId} not found` });
  }

  products.splice(productIndex, 1);

  writeProductsToFile(products);

  res.status(200).json({ success: true });
});

module.exports = router;
