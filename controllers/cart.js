const Cart = require("../models/cart");

exports.getCart = (req, res) => {
    const userId = req.userId.toString();

    Cart.findOne({ userId: userId })
        .populate("cartProducts.prodId")
        .lean()
        .then((cart) => {
            res.status(200).json({
                cart: cart.cartProducts,
                message: "Cart Found",
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

exports.addCart = (req, res) => {
    const userId = req.userId.toString();
    const products = req.body.productList;
    
    Cart.updateOne({ userId: userId }, {cartProducts: products})
        .then((result) => {
            res.status(200).json({
                message: "cart updated",
                result: "success",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Something went wrong while adding",
                result: "error",
            });
        });
};

exports.deleteCart = (req, res) => {
    const userId = req.userId;
    const prodId = req.params.prodId;

    Cart.findOne({ userId: userId })
        .then((cart) => {
            const index = cart.cartProducts.findIndex(
                (item) => item.prodId.toString() === prodId.toString()
            );
            if (index === -1) {
                return res.status(404).json({
                    message: "Product not in the cart",
                    result: "failed",
                });
            }
            if (cart.cartProducts[index].quantity <= 1) {
                cart.cartProducts.splice(index, 1);
            } else {
                cart.cartProducts[index].quantity--;
            }
            return cart.save();
        })
        .then((result) => {
            res.status(200).json({
                message: "cart updated",
                result: "success",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Something went wrong while deleting",
                result: "error",
            });
        });
};
