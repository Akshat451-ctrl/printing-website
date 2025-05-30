import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pdfFile: {
        type: String, // Path or URL to the uploaded PDF file
        required: true,
    },
    pageCount: {
        type: Number, // Number of pages in the PDF
        required: true,
    },
    printType: {
        type: String,
        enum: ['single-sided', 'double-sided'],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    orderStatus: {
        type: String,
        enum: ['notplaced','placed', 'orderAcceptedByVendor', 'orderPrinted', 'delivered'],
        default: 'notplaced',
    },
    otp: {
        type: String, // OTP for secure delivery
        required: true,
        unique: true,
    },
    orderId: {
        type: String, // Unique identifier for the order
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor', // Reference to the Vendor model
    },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;