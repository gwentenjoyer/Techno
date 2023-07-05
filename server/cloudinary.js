const cloudinary = require("cloudinary").v2;
require('dotenv/config');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

const FOLDER = "techno/images"

const options = {
    use_filename: true,
    overwrite: true,
    folder: FOLDER
}

const uploadImage = async (imagePath) => {
    try{
        const result = await cloudinary.uploader.upload(imagePath, options);
        return result.secure_url;
    } catch (err) {
        console.error(err);
    }
}

const destroyImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePath);
        return result;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    uploadImage: uploadImage,
    destroyImage: destroyImage,
    folder: FOLDER
}