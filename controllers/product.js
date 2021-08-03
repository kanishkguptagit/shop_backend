const { validationResult } = require("express-validator");

const Product = require('../models/product');

exports.addProduct = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(403).json({
            message: errors.array()[0].msg,
            result: "error",
        });
    }

    const name = (req.body.name).trim();
    const type = (req.body.type).trim() || undefined;
    const image = (req.body.image).trim() || undefined;
    let tags = req.body.tags;

    if(tags.length <= 0)
    tags = undefined;

    const product = new Product({
        name: name,
        product_type: type,
        product_image: image,
        product_tags: tags
    })

    product.save();

    res.status(200).json({
        message: "Product added successfully",
        result: "success"
    })
};

exports.deleteProduct = () => {};

exports.editProduct = () => {};
