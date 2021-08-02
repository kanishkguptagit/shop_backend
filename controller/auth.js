const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    bycrypt
        .hash(password, 12)
        .then((hashedPass) => {
            const user = new User({
                email: email,
                password: hashedPass,
                name: name,
            });
            return user.save();
        })
        .then((result) =>
            res.status(200).json({
                message: "User Created Successfully!",
                userId: result._id,
            })
        )
        .catch((err) => {
            res.status(500).json({
                message: "Something went wrong!",
            });
        });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;

    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    message: "User not found",
                });
            }
            loadedUser = user;
            return bycrypt.compare(password,user.password);
        })
        .then((isEqual) => {
            if (!isEqual) {
                res.status(401).json({
                    message: "Invalid Password",
                });
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString(),
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: "1h",
                }
            );
            res.status(200).json({
                token: token,
                userId: loadedUser._id,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something went wrong!",
            });
        });
};
