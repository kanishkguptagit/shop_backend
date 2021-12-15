const Orders = require("../models/orders");
const Cart = require("../models/cart");

exports.getOrders = (req, res) => {
    const userId = req.userId.toString();

    Orders.findOne({ userId: userId })
        .populate("orders.prodId")
        .lean()
        .then((order) => {            
            if (order.orders.length === 0) {
                return res.status(200).json({
                    orders: [],
                    message: "No Orders found",
                    result: "success",
                });
            }

            res.status(200).json({
                orders: order.orders,
                message: "Orders Found",
                result: "success",
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                result: "error",
            });
        });
};

exports.singleOrders = (req, res) => {
    const userId = req.userId.toString();
    const newOrder = req.body.orderList;

    if (newOrder.length === 0) {
        return res.status(200).json({
            message: "No new orders found",
            result: "success",
        });
    }

    Orders.findOne({ userId: userId })
        .then((result) => {
            result.orders.push(newOrder);
            return result.save();
        })
        .then((result) => {
            res.status(200).json({
                message: "Order Placed",
                result: "success",
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                result: "error",
            });
        });
};

exports.multiOrders = (req, res) => {
    const userId = req.userId.toString();

    Cart.findOne({ userId: userId })
        .then((result) => {
            if (result.cartProducts.lenght === 0) {
                return res.status(405).json({
                    message: "Cart is empty",
                    result: "failed",
                });
            }

            Orders.findOne({ userId: userId })
                .then((order) => {
                    order.orders.push({
                        $each: result.cartProducts,
                        $position: 0,
                    });
                    result.cartProducts = [];
                    result.save();
                    return order.save();
                })
                .then((result) => {
                    res.status(200).json({
                        message: "Order placed",
                        result: "success",
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Something went wrong while adding",
                        result: "error",
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something went wrong while adding",
                result: "error",
            });
        });
};

exports.cancelOrder = (req,res) => {
    const userId = req.userId.toString();
    const orderId = req.params.orderId.toString();

    Orders.findOne({userId:userId})
    .then(result => {
        result.orders.splice(result.orders.findIndex(item => item._id.toString() === orderId), 1);
        return result.save();
    })
    .then(result => {
        res.status(200).json({
            message:"order cancelled",
            result: "success"
        })
    })
    .catch(err => {
        res.send(500).json({
            message:err.message,
            result:"error"
        })
    })
}