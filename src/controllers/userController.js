import Order from "../models/order.js"; // Adjust the path as necessary

// Controller to get all orders for a specific user
const getOrdersByUserId = async (req, res) => {
    try {
        // Ensure the user is authenticated and their ID is available
        const userId = req.userId;
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized access!" });
        }

        // Fetch all orders for the authenticated user
        const orders = await Order.find({ userId });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found!" });
        }

        console.log("Fetched orders:", orders);
        // Return the orders
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch orders!" });
    }
};


export { getOrdersByUserId};
