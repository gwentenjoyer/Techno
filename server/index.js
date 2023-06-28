const express = require("express");
const path = require("path");
require("dotenv");

require('./db.js') ;

// express app
const app = express();

// app get methods
app.get("/", (req, res) => {
    /* res.sendFile("index.html", { root: path.join(__dirname, "../public") }); */
    res.render("main");
});


const productController = require("./controllers/productController")
app.use("/product", productController);


// app listen
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at: http://127.0.0.1:${port}`);
});