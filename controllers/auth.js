const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

const User = require("../models/user");
const PublishedProduct = require("../models/publishedProduct");
const product = require("../models/product");

exports.signup = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            message: errors.array()[0].msg,
            result: "error"
        })
    }
    
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;    

    let user_id;
    let product_array_id;

    bcrypt
        .hash(password, 12)
        .then((hashedPass) => {
            const user = new User({
                email: email,
                password: hashedPass,
                name: name,                
            });
            return user.save();
        })
        .then(result => {
            const product_array = new PublishedProduct({
                userId: result._id
            });
            user_id = result._id;
            return product_array.save();
        })
        .then(result => {
            product_array_id = result._id;
            return User.findById(user_id);
        })
        .then(user => {
            user.products_stored = product_array_id;
            return user.save();
        })
        .then((result) => {
            res.status(200).json({
                message: "User created successfully",
                result: "success",
                userId: result._id,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something went wrong",
                result: "error",
            });
        });
    
};

exports.login = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            message: errors.array()[0].msg,
            result: "error"
        })
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
                token: token,
                userId: loadedUser._id,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something went wrong",
                result: "error",
            });
        });
};
