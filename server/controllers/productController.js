const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const Product = require("../models/productModel");
const cloudinary = require("../cloudinary");
const { log, error } = require("console");
require("dotenv/config");

const upload = multer({ dest: 'uploads/' });

router.post('/add', upload.single("file"), async (req, res) => {
    let obj = req.body;
    let img = req.file;

    console.log(obj);
    console.log(img);
    
    if (obj) {
        const imgSecureUrl = await cloudinary.uploadImage(img.path);
        fs.unlink(img.path, (err) => {
            if (err)
                console.error(err);
            else
                console.log("Image was successfully deleted");
        })
        let productData = new Product(obj);
        productData.cloudinaryPublicUrl = imgSecureUrl;
        try {
            await productData.save();
            return res.send(productData);
        } catch(err) {
            console.error(err);
            res.sendStatus(500).send(err);
        }
    } else {
        console.log("something went wrong while receiving data from Product Form");
        return res.sendStatus(400);
    }
})

router.put('/update/:id', upload.single("file"), async (req, res) => {
    const obj = req.body;
    const img = req.file;
    const productId = req.params.id;
    if (obj) {
        if (img) {
            const newImgUrl = await cloudinary.uploadImage(img.path);
            fs.unlink(img.path, err => {
                if (err)
                    console.error(err);
            })
            obj.cloudinaryPublicUrl = newImgUrl;
            const oldImgUrl = (await Product.findById(productId)).cloudinaryPublicUrl;
            const oldImgId = getImgIdFromCloudinary(oldImgUrl);
            const delImgRes = await cloudinary.destroyImage(oldImgId);      
        } else {
            /* console.log("old image"); */
        }

        try {
            const result = await Product.findByIdAndUpdate(productId, obj);
            /* console.log(result); */
            return res.sendStatus(200);
        } catch (err) {
            console.error(err);
        }

    } else {
        console.log("obj is empty...");
        res.sendStatus(404).send(error);
    }

    
})

router.get('/list', async (req, res) => {
    const productData = await Product.find();
    res.send(productData);
})

router.delete('/delete', async (req, res) => {
    const delId = req.body.id;
    const result = await Product.findByIdAndDelete(delId);
    try {
        if (!result)
            console.log(`no product with id: ${delId}`);
        else {
            const imgPath = result.cloudinaryPublicUrl;
            const imgId = getImgIdFromCloudinary(imgPath);
            const delImgRes = await cloudinary.destroyImage(imgId);
            res.sendStatus(200);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
})

router.get('/single/:id', async (req, res) => {
    const productId = req.params.id;
    /* console.log(productId); */
    try {
        const product = await Product.findById(productId);
        if (!product) {
            console.log(`No product with id: ${productId}`);
            res.status(404).send("Product not found");
        } else {
            res.send(product);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
});

function getImgIdFromCloudinary(path){
    const pattern = new RegExp(`${cloudinary.folder}/[a-zA-Z_0-9]+`);
    const execRes = pattern.exec(path);
    let imgId;
    if (execRes){
        imgId = execRes[0];
        return imgId;
    }
    else{
        throw "can't extract id from path";
    }
}

router.get("/brands", async (req, res) => {
    try {
        const brands = await Product.distinct('producer');
        const uniqueBrands = brands
        .map(brand => ({
          id: brand.toLowerCase(),
          title: brand,
          'data-brand': brand
        }))
        .sort((a, b) => a.title.localeCompare(b.title));
        /* console.log(uniqueBrands); */
        res.send(uniqueBrands);
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;