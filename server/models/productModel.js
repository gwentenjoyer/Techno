const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productModelSchema = new Schema ({
    product: {type: String, default: "Блок живлення для ПК", required: true},
    producer: {type: String, required: true},
    model: {type: String, required: true},
    power: {type: Number, required: true},
    cables: {type: String, required: true},
    fan: {type: Number, required: true},
    efficiency: {type: Number, required: true},
    availability: {type: String, required: true},
    price: {type: String, required: true},
    discount: {type: String},
    cloudinaryPublicUrl: {type: String, required: true}
}, {timestamps: true});

const Product = mongoose.model('Product', productModelSchema);
module.exports = Product;