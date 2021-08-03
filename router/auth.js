const { Router } = require('express');
const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/signup', authController.signup);

router.get('/login', authController.login);

module.exports = router;