const mongoose = require('mongoose');
require('dotenv/config');
require('./models/productModel');

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("MongoDB has been successfully connected...");
})
.catch((err) => {
    console.error(err);
});

module.exports = mongoose;