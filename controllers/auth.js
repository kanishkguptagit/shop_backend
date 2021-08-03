const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const user_type = req.body.type;
    bcrypt
        .hash(password, 12)
        .then((hashedPass) => {            
            const user = new User({
                email: email,
                password: hashedPass,
                name: name,
                user_type: user_type,
            });
            return user.save();
        })
        .then((result) => {
            res.status(200).json({
                message: "User created successfully",
                result: "success",
                userId: result._id
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
    res.status(200).json({
        message: "HERE IN LOGIN",
    });
};
