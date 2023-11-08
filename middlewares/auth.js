import jwt from "jsonwebtoken";

const authenticateRefreshToken = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Please login again." });
        }
        if (req.body.email === decoded.email && decoded.tokenType === "refresh") {
            req.body.userId = decoded.userId;
            req.body.refreshToken = token;
            return next();
        }
        return res.status(401).json({ message: "Please login again." });
    });
};

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Please login again." });
        }
        if (decoded.tokenType === "auth") {
            req.body.userId = decoded.userId;
            return next();
        }
        return res.status(401).json({ message: "Please login again." });
    });
};

export {authenticateRefreshToken, authenticateUser} ;