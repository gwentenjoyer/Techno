const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

const options = {
    use_filename: true,
    overwrite: true,
    folder: "techno/images"
}

const uploadImage = async (imagePath) => {
    try{
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result.secure_url); 
    } catch (err) {
        console.error(err);
    }
}

const destroyImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePath);
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    uploadImage: uploadImage,
    destroyImage: destroyImage
}