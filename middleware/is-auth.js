const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
        return res.status(401).json({
            message: "User not Authenticated",
            result: "failed",
        });
    }

    const userToken = authHeader.split(" ")[1];
    let isToken;

    try {
        isToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    } catch {
        return res.status(500).json({
            message: "Something went wrong",
            result: "erroe",
        });
    }

    if (!isToken) {
        return res.status(401).json({
            message: "User not Authenticated",
            result: "failed",
        });
    }

    req.userId = userToken.userId;
    next();
};