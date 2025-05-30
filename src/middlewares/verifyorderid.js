import Order from '../models/order.js';

// filepath: c:\Users\om sai ram\Desktop\PQM\Backend_Files\src\middlewares\verifyorderid.js

export const verifyorderid = async (req, res, next) => {
    try {
        const { orderId } = req.body;

        // Check if the order ID exists in the database
        const order = await Order.findOne({ orderId: orderId });
        

        if (!order) {
            return res.status(404).json({ message: 'Order ID not found' });
        }

       console.log('Order ID verified successfully:', orderId);
       next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.error('Error verifying order ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};