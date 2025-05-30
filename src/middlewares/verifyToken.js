//create this middleware to verify the token
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }
    // Remove 'Bearer ' prefix if present
    if (token.startsWith("Bearer ")) {
        token = token.slice(7).trim();
    }
    jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: "Unauthorized!" });
        }
        if (decoded.role === "vendor") {
            req.vendorId = decoded.id;
        } else {
            req.userId = decoded.id;
        }
         console.log("Decoded token:", decoded);
        next();
    });
};
// export named verifyToken
export { verifyToken };
// This middleware checks if the user is authenticated by verifying the JWT token.
// If the token is valid, it adds the user ID to the request object and calls the next middleware.