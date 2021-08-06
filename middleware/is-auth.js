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
    let decodedToken;

    try {
        decodedToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    } catch {
        return res.status(500).json({
            message: "Something went wrong during authentication",
            result: "error",
        });
    }

    if (!decodedToken) {
        return res.status(401).json({
            message: "User not Authenticated",
            result: "failed",
        });
    }

    req.userId = decodedToken.userId;
    next();
};
