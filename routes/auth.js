const express = require('express');

const authController = require('../controller/auth');

const router = express.Router();

router.get("/signup", authController.signup);

router.get("/login", authController.login);

module.exports = router;