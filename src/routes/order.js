import express from 'express';
import { createOrder, getOrders} from '../controllers/orderController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyUser } from '../middlewares/verifyUser.js';
import { verifyVendor } from '../middlewares/verifyVendor.js';
import { paymentsummary, pay, verifypayment } from '../controllers/paymentController.js';
import { addVendorToOrder , updateOrderPrinted , updateAllOrdersToPlaced, getAcceptedOrders} from '../controllers/vendorController.js';
import { verifyorderid } from '../middlewares/verifyorderid.js';
import { sendpdf } from '../controllers/pdfController.js';
import { verifyOtp } from '../controllers/otpController.js';
import {getOrdersByUserId} from '../controllers/userController.js';

const router = express.Router();

// Create a new order (for user only)
router.post('/', verifyToken, verifyUser,paymentsummary,pay,verifypayment,createOrder); 


 // Get all orders (for vendor only whose payment status is completed)
router.get('/', verifyToken, verifyVendor, getOrders);

//Update order status (for vendor only)
router.put('/orderid',verifyToken, verifyVendor, addVendorToOrder);

//route to download the pdf file for vendor
router.get('/download/orderid', verifyToken, verifyVendor,verifyorderid,sendpdf);

//route to update staus of orderPrinted
router.put('/orderPrinted/orderid', verifyToken, verifyVendor,verifyorderid,updateOrderPrinted);


//route for otp verification for delivery of item
router.post('/otp/orderid', verifyToken, verifyVendor,verifyorderid,verifyOtp);

//router for get order list by userid
router.get('/userid', verifyToken, verifyUser, getOrdersByUserId);

//route to get order list by vendor id
router.get('/vendorid', verifyToken, verifyVendor, getAcceptedOrders);

//route to update all order status to placed
router.put('/updateAllOrdersToPlaced', verifyToken, verifyVendor, updateAllOrdersToPlaced);

export default router;

