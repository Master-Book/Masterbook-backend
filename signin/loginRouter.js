
const express = require("express");
const router = express.Router();
const loginController = require("./controller/loginController");
const token = require('../auth/refreshCheck');

router.post("/", loginController.login);
router.get("/refresh", token.refresh);

module.exports = router;
            