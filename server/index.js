const express = require("express");
const session = require("express-session");
const path = require("path");
const productController = require("./controllers/productController");
const filterController = require("./controllers/filterProductController");
const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userControler");
require("dotenv/config");

require("./db");

// express app
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../public/views"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use(
    session({
        secret: "techno-cookies-secret",
        cookie: {
          httpOnly: true,
        },
        saveUninitialized: false,
        resave: false,
    })
);

app.use("/products", productController);
app.use("/products/filter", filterController);
app.use("/auth", authController);
app.use("/user", userController);
app.use("/", homeController);

app.use("/settings", (req, res) => {
    /* res.redirect("../public/views/settings") */
});

// app listen
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at: http://127.0.0.1:${port}`);
});
