const express = require("express");
const { body } = require("express-validator");

const productController = require("../controllers/product");

const router = express.Router();

router.post(
    "/add",
    [body("name").trim().not().isEmpty().withMessage("invalid name")],
    productController.addProduct
);

router.delete("/delete/:prodId", productController.deleteProduct);

router.put("/edit/:prodId", productController.editProduct);

module.exports = router;
