const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const { log, error } = require("console");

router.post("/brand", async (req, res) => {
    const selectedBrands = req.body;
    try {
        let products;
        if (selectedBrands.length > 0) {
            products = await Product.find({
                producer: { $in: selectedBrands }
            });
        } else {
            products = await Product.find();
        }
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Внутрішня помилка сервера');
    }
})


router.post("/power", async (req, res) => {
    const selectedPowers = req.body;
    try {
        let products;
        if (selectedPowers.length > 0) {
            products = await Product.find({
                $or: selectedPowers.map(power => ({
                    power: { $gte: power.minPower, $lt: power.maxPower }
                }))
            });
        } else {
            products = await Product.find();
        }
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Внутрішня помилка сервера');
    }
})


router.post("/cable_connection", async (req, res) => {
    const selectedCableConnections = req.body;
    try {
        let products;
        if (selectedCableConnections.length > 0) {
            products = await Product.find({
                cables: { $in: selectedCableConnections }
            });
        } else {
            products = await Product.find();
        }
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Внутрішня помилка сервера');
    }
})

router.post("/fan_diameter", async (req, res) => {
    const selectedFanDiameters = req.body;
    try {
        let products;
        if (selectedFanDiameters.length > 0) {
            products = await Product.find({
                fan: { $in: selectedFanDiameters }
            });
        } else {
            products = await Product.find();
        }
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Внутрішня помилка сервера');
    }
})

router.post("/efficiency", async (req, res) => {
    const selectedEfficiencies = req.body;
    try {
        let products;
        if (selectedEfficiencies.length > 0) {
            products = await Product.find({
                $or: selectedEfficiencies.map(efficiency => ({
                    efficiency: { $gte: efficiency.minEff, $lt: efficiency.maxEff }
                }))
            });
        } else {
            products = await Product.find();
        }
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Внутрішня помилка сервера');
    }
})


router.post("/availability", async (req, res) => {
    const selectedAvailabilities = req.body;
    try {
        let products;
        if (selectedAvailabilities.length > 0) {
            products = await Product.find({
                availability: { $in: selectedAvailabilities }
            });
        } else {
            products = await Product.find();
        }
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Внутрішня помилка сервера');
    }
})


router.post('/price', async (req, res) => {
    const { minPrice, maxPrice } = req.body;
    try {
        let products;
    
        if (minPrice && maxPrice) {
            products = await Product.find({
            price: { $gte: minPrice, $lte: maxPrice }
            });
        } else if (minPrice) {
            products = await Product.find({ price: { $gte: minPrice } });
        } else if (maxPrice) {
            products = await Product.find({ price: { $lte: maxPrice } });
        } else {
            products = await Product.find();
        }
    
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;

