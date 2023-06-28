const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productModelSchema = new Schema ({
    productTitle: {type: String, default: "Блок живлення для ПК", required: true},
    productBrand: {type: String, required: true},
    productModel: {type: String, required: true},
    productPower: {type: Number, required: true},
    productCablesConnection: {type: String, required: true},
    productFanDiameter: {type: Number, required: true},
    productEfficiency: {type: Number, required: true},
    productAvailability: {type: String, required: true},
    productPrice: {type: String, required: true},
    productDiscount: {type: String},
    cloudinaryPublicId: {type: String, required: true}
}, {timestamps: true});

const Product = mongoose.model('Product', productModelSchema);
module.exports = Product;