import dotenv from "dotenv";
import User from "../models/user.js"; // adjust the path as necessary

dotenv.config();

const verifyUser = async (req, res, next) => {
    try {
        // Token is already verified by verifyToken middleware
        // So we expect req.userId to be set previously.
        if (!req.userId) {
            return res.status(403).json({ message: "No token provided!" });
        }
        // Check that the user exists in the database using the id from the verified token
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        // Attach user data to the request object
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Unauthorized!" });
    }
};

export { verifyUser };
