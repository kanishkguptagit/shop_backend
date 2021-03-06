const { validationResult } = require("express-validator");

const Product = require("../models/product");
const PublishedProduct = require("../models/publishedProduct");

exports.getProducts = (req, res) => {
    Product.find()
        .lean()
        .then((products) => {
            res.status(200).json({
                products: products,
                message: "Products Found",
                result: "success",
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something went wrong while fetching",
                result: "error",
            });
        });
};

exports.addProduct = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(403).json({
            message: errors.array()[0].msg,
            result: "error",
        });
    }

    const name = req.body.name.trim();
    const type = req.body.type.trim() || undefined;
    const image = req.body.image.trim() || undefined;
    let tags = req.body.tags;

    if (tags.length <= 0) tags = undefined;

    const product = new Product({
        name: name,
        product_type: type,
        product_image: image,
        product_tags: tags,
        creator: req.userId,
    });

    product
        .save()
        .then((result) => {
            return PublishedProduct.findOne({ userId: req.userId });
        })
        .then((result) => {
            result.products_added.push(product);
            return result.save();
        })
        .then((result) => {
            res.status(200).json({
                message: "Product added successfully",
                result: "success",
                id: product._id,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something went wrong while adding",
                result: "error",
            });
        });
};

exports.deleteProduct = (req, res) => {
    const prodId = req.params.prodId;

    Product.findById(prodId)
        .then((prod) => {
            if (!prod) {
                return res.status(404).json({
                    message: "Product not found",
                    result: "failed",
                });
            }
            if (prod.creator.toString() === req.userId) {
                Product.findByIdAndDelete(prodId)
                    .then((result) => {
                        return PublishedProduct.findOne({ userId: req.userId });
                    })
                    .then((result) => {
                        result.products_added.pull(prodId);
                        return result.save();
                    })
                    .then((result) => {
                        return res.status(200).json({
                            message: "Product removed successfully",
                            result: "success",
                        });
                    })
                    .catch((err) => {
                        throw err;
                    });
            } else {
                res.status(403).json({
                    message: "Forbidden to delete this item",
                    result: "failed",
                });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Something went wrong while deleting",
                result: "error",
            });
        });
};

exports.getUserProducts = (req, res) => {
    const userId = req.userId.toString();

    PublishedProduct.findOne({ userId: userId })
        .populate("products_added")
        .lean()
        .then((result) => {
            if (!result) {
                res.status(404).json({
                    message: "Products Not Found",
                    result: "failed",
                });
            }
            res.status(200).json({
                products: result.products_added,
                message: "Products Found",
                result: "success",
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Something went wrong while fetching user products",
                result: "error",
            });
        });
};

exports.editProduct = (req, res) => {
    const prodId = req.params.prodId;

    const name = req.body.name.trim() || undefined;
    const type = req.body.type.trim() || undefined;
    const image = req.body.image.trim() || undefined;
    let tags = req.body.tags;

    if (tags.length <= 0) tags = undefined;

    const newObj = {};
    if (name) newObj.name = name;
    if (type) newObj.product_type = type;
    if (image) newObj.product_image = image;
    if (tags) newObj.product_tags = tags;

    Product.findById(prodId)
        .then((prod) => {
            if (!prod) {
                res.status(404).json({
                    message: "Product Not Found",
                    result: "failed",
                });
            }
            if (prod.creator.toString() !== req.userId) {
                res.status(401).json({
                    message: "Not Authorized",
                    result: "failed",
                });
            }
            Product.findByIdAndUpdate(prodId, newObj)
                .then((result) => {
                    res.status(200).json({
                        message: "Updated successfully!",
                        result: "success",
                    });
                })
                .catch((err) => {
                    throw err;
                });
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Something went wrong while fetching user products",
                result: "error",
            });
        });
};
