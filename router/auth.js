const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
    "/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Enter a valid email")
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then((userDoc) => {
                    if (userDoc) {
                        return Promise.reject("E-mail address already exists");
                    }
                });
            })
            .normalizeEmail(),

        body("password").trim().isLength({ min: 8 }).withMessage('Password length must be 8'),
        body("name").trim().not().isEmpty(),
    ],
    authController.signup
);

router.post("/login", [
    body("email").isEmail().withMessage('Invalid Email').normalizeEmail(),
    body("password").trim().isLength({min:8}).withMessage('Invalid Password')
], authController.login);

module.exports = router;
