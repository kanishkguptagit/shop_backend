const express = require('express');

const orderController = require('../controllers/orders');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/',isAuth, orderController.getOrders);

router.post('/single',isAuth, orderController.singleOrders);

router.post('/multi',isAuth, orderController.multiOrders);

router.delete('/cancel/:orderId', isAuth, orderController.cancelOrder);

module.exports = router;