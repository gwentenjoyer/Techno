const express = require("express");
const path = require("path");
const productController = require("./controllers/productController");
const filterController = require("./controllers/filterProductController");
require("dotenv/config");

require("./db");

// express app
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/products", productController);
app.use("/products/filter", filterController);

// app listen
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at: http://127.0.0.1:${port}`);
});
