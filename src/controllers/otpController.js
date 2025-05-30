import Order from '../models/order.js';


export const verifyOtp = async (req, res) => {
    try {
        const { orderId, otp } = req.body;


        // Find the order by orderId
        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the provided OTP matches the one in the database
        if (order.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // If OTP is valid, update the order status to 'delivered'
        order.orderStatus = 'delivered';
        await order.save();

        console.log('Order status updated to delivered');
        res.status(200).json({ message: 'OTP verified successfully, order delivered', order });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};