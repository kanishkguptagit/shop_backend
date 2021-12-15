const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const PublishedProduct = require("../models/publishedProduct");
const Cart = require("../models/cart");
const Order = require("../models/orders");

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg,
            result: "error",
        });
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    let user_result;
    let result;

    try {
        const hashedPass = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            password: hashedPass,
            name: name,
        });
        user_result = await user.save();
        console.log(user_result);
        const user_id = user_result._id;

        const product_array = new PublishedProduct({
            userId: user_id,
        });
        result = await product_array.save();
        const product_array_id = result._id;

        const cart = new Cart({
            userId: user_id,
        });
        result = await cart.save();
        const cart_id = result._id;

        const order = new Order({
            userId: user_id,
        });
        result = await order.save();
        const order_id = result._id;

        user_result.products_stored = product_array_id;
        user_result.product_cart = cart_id;
        user_result.orders = order_id;
        await user_result.save();

        res.status(200).json({
            message: "User created successfully",
            result: "success",
            userId: user_result._id,
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
            result: "error",
        });
    }
};

exports.login = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg,
            result: "error",
        });
    }

    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    message: "User not found",
                    result: "failed",
                });
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then((isEqual) => {
            if (!isEqual) {
                res.status(401).json({
                    message: "Invalid Password",
                    result: "failed",
                });
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString(),
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                email: loadedUser.email,
                name: loadedUser.name,
                token: token,
                userId: loadedUser._id,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something went wrong during login",
                result: "error",
            });
        });
};
