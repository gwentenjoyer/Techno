const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;

