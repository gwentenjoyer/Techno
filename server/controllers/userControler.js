const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get('/single/:nickname', async (req, res) => {
    const userNickname = req.params.nickname;
    try {
        const user = await User.findOne({ user_nickname: userNickname });
        if (!user) {
            console.log(`No user with nickname: ${userNickname}`);
            res.status(404).send("Product not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500).send("Внутрішня помилка сервера")
    }
});

module.exports = router;