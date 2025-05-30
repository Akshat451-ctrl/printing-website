import dotenv from "dotenv";
import Vendor from "../models/vendor.js"; // adjust the path as necessary

dotenv.config();

const verifyVendor = async (req, res, next) => {
    try {
        // Token is already verified by verifyToken middleware
        // So we expect req.vendorId to be set previously.
        if (!req.vendorId) {
            return res.status(403).json({ message: "No token provided!" });
        }
        // Check that the vendor exists in the database using the id from the verified token
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found!" });
        }
        // Attach vendor data to the request object
        req.vendor = vendor;
        console.log("Vendor ID:", req.vendorId);
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized!" });
    }
};

export { verifyVendor };