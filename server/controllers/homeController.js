const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    res.render("index", {
        user: req.session.user
    });
});

module.exports = router;