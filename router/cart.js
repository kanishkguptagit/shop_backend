const express = require('express');

const cartController = require('../controllers/cart');
const isAuth = require('../middleware/is-auth');

const router  = express.Router();

router.get('/',isAuth, cartController.getCart);

router.post('/',isAuth, cartController.addCart);

router.delete('/:prodId', isAuth, cartController.deleteCart);

module.exports = router;