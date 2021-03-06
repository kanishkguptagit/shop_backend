const express = require("express");
const isAuth = require('../middleware/is-auth');
const { body } = require("express-validator");

const productController = require("../controllers/product");

const router = express.Router();

router.get('/user-products/', isAuth, productController.getUserProducts);

router.get('/products', productController.getProducts);

router.post(
    "/add",
    isAuth,
    [body("name").trim().not().isEmpty().withMessage("invalid name")],
    productController.addProduct
);

router.delete("/delete/:prodId", isAuth, productController.deleteProduct);

router.put("/edit/:prodId", isAuth, productController.editProduct);

module.exports = router;
