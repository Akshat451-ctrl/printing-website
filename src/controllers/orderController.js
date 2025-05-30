// orderController.js
// Removed unused import of 'nextTick'
import Order from "../models/order.js";
import crypto from "crypto";

const generateOrderId = async () => {
    let orderId;
    let isUnique = false;

    // Check if there are no orders in the database
    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
        return crypto.randomInt(100000, 1000000).toString(); // Return a random 6-digit number if no orders exist
    }

    while (!isUnique) {
        orderId = crypto.randomInt(100000, 1000000).toString(); // Generate a 6-digit number using crypto
        const existingOrder = await Order.findOne({ orderId }); // Check if it already exists in the database
        if (!existingOrder) {
            isUnique = true; // If no existing order is found, the ID is unique
        }
    }

    return orderId;
};
const genrateOTP = () => {
    return crypto.randomInt(100000, 1000000).toString();
};

// Create a new order (for user only)
export const createOrder = async (req, res) => {
    try {
        const { pdfFile, printType } = req.body;

        if (!pdfFile || !printType) {
            return res
                .status(400)
                .json({ message: "pdfFile and printType are required" });
        }

        if (!req.userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Generate a simple OTP using crypto
        const otp = genrateOTP();
        console.log("Generated OTP:", otp);

        // Generate a unique order ID
        const orderId = generateOrderId();
        console.log("Generated Order ID:", orderId);

        // Create an order document using the Order model
        const order = new Order({
            userId: req.userId,
            pdfFile, // Using destructured variable
            printType, // Using destructured variable
            otp,
            orderId: await generateOrderId(), // Await the generated order ID
            orderStatus: "placed",
            paymentStatus: "completed",
            pageCount: req.body.pageCount || 0, // Default to 0 if pageCount is not provided
        });

        await order.save();
        console.log("Order created successfully:", order);

        //send response to the client
        res.status(201).json({
            message: "Order created successfully",
            orderId: order.orderId, // Send the generated order ID in the response
            otp, // Send the generated OTP in the response
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating order" });
    }
};

// Get orders (for vendor or user)
// For now, this returns all orders.
export const getOrders = async (_, res) => {
    try {
        const orders = await Order.find({
            paymentStatus: "completed",
            orderStatus: "placed",
        });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching orders" });
    }
};



