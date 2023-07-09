const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { log, error } = require("console");

router.post("/login", async(req, res) => {
    const loginData = req.body;
    if (!loginData) {
        res.sendStatus(400);
    }
    else {
        try {
            const dbAnswer = await User.findOne({
                user_email: loginData.email,
                user_password: loginData.password
            })
            if(!dbAnswer) {return response.sendStatus(404);}
            req.session.user = {
                user_nickname:dbAnswer.user_nickname,
                user_email:loginData.user_email,
                user_password:loginData.user_password,
                isAdmin:dbAnswer.isAdmin
            }
            res.sendStatus(200);
        } catch (err) {
            console.error(err);
        }
    }
})

router.post("/signup", async(req, res) => {
    const registerData = req.body;
    if (!registerData) {
        res.sendStatus(400);
    }
    else {
        try {
            registerData.isAdmin = false;
            console.log(registerData);
            const toSave = User({
                user_nickname: registerData.nickname,
                user_email: registerData.email,
                user_password: registerData.password,
                isAdmin: registerData.isAdmin
            });
            await toSave.save();
            req.session.user = {
                user_nickname: registerData.nickname,
                user_email: registerData.email,
                user_password: registerData.password,
                isAdmin: registerData.isAdmin
            }
            res.sendStatus(200);
        } catch (err) {
            if (err.code === 11000) {
                return response.sendStatus(403);    // account already exists
            } else {
            console.log(err);
            return response.sendStatus(500);
            }
        }
    }
})

router.post('/logout', async(req, res) => {
    req.session.destroy();
    res.sendStatus(204);
})

module.exports = router;