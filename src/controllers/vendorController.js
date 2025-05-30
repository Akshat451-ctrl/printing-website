import Order from '../models/order.js';

const addVendorToOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!req.vendorId || !orderId) {
            return res.status(400).json({ message: "Vendor ID (from token) and Order ID are required." });
        }

        // Find the order by orderId
        const order = await Order.findOne({ orderId }, {new: true });
        

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        // Add vendor ID from the request (set by verifyVendor middleware) to the order
        order.vendorId = req.vendorId;
        //change status to placed
        order.orderStatus = 'orderAcceptedByVendor';

        // Save the updated order
        await order.save();
        console.log("Vendor ID added to the order:",order);
        

        res.status(200).json({ message: "Vendor ID added to the order successfully.", order });
    } catch (error) {
        res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};

// write function to update updateOrderPrinted
const updateOrderPrinted = async (req, res) => {
    try {
        
        const orderId = req.body.orderId;
        if (!req.vendorId || !orderId) {
            return res.status(400).json({ message: "Vendor ID (from token) and Order ID are required." });
        }
        // Find the order by orderId
        const order = await Order.findOne({ orderId });
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }
        // Update the order status to 'orderPrinted'
        order.orderStatus = 'orderPrinted';
        // Save the updated order
        await order.save();
        console.log("Order status updated to 'orderPrinted':");
        res.status(200).json({ message: "Order status updated to 'orderPrinted' successfully.", order });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred.", error: error.message });
    }
}

//make all orderStatus placed function
 const updateAllOrdersToPlaced = async (req, res) => {
    try {
        
        const result = await Order.updateMany(
            { orderStatus: { $ne: "placed" } }, // Filter orders not already "placed"
            { $set: { orderStatus: "placed" } } // Update orderStatus to "placed"
        );
        console.log("ALL Orders updated to 'placed':");

        res.status(200).json({ message: "Orders updated to 'placed' for the vendor", result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update orders!" });
    }
};

//function to get all accepted orders
const getAcceptedOrders = async (req, res) => {
    try {
        const vendorId = req.vendorId; // Get vendorId from the request

        // Find all orders where the vendorId matches and orderStatus is "orderAcceptedByVendor"
        const acceptedOrders = await Order.find({ 
            vendorId: vendorId, 
            orderStatus: { $in: ["orderAcceptedByVendor", "orderPrinted"] } 
        });

        if (acceptedOrders.length === 0) {
            return res.status(404).json({ message: "No accepted orders found for this vendor." });
        }

        res.status(200).json( acceptedOrders );
    } catch (error) {
        res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};


// Export the functions
export { addVendorToOrder, updateOrderPrinted , updateAllOrdersToPlaced , getAcceptedOrders};



