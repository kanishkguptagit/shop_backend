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
    const prodId = req.body.prodId;

    Cart.findOne({ userId: userId })
        .then((cart) => {
            const index = cart.cartProducts.findIndex(
                (item) => item.prodId.toString() === prodId.toString()
            );
            if (index === -1) {
                cart.cartProducts.push({ prodId: prodId, quatity: 1 });
            } else {
                cart.cartProducts[index].quantity++;
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
            res.status(500).json({
                message: "Something went wrong while adding",
                result: "error",
            });
        });
};
