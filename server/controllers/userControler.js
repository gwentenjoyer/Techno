const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get('/single/:nickname', async (req, res) => {
    const userNickname = req.params.nickname;
    console.log(userNickname);
});

module.exports = router;