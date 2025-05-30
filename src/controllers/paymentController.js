
import crypto from 'crypto';

const generateOrderId = () => {
  return crypto.randomUUID();
};


export const paymentsummary = async (req, res, next) => {
    try {
        const { pdfFile, printType } = req.body; // Extract required fields from the request body
        const userId = req.userId; // Get userId from the request object
        if (!pdfFile || !userId || !printType) {
            console.log('Missing required fields:', { pdfFile, userId, printType });
            return res.status(400).json({ message: 'PDF file, userId, and printType are required' });
        }

        // Simulate counting pages in the PDF
        const pageCount = await countPdfPages();

        // Determine the rate based on print type
        const rate = printType === 'double-sided' ? 0.75 : 1;

        // Calculate the total amount to pay
        const amountToPay = pageCount * rate;

        // Generate a unique order ID
        const orderId = generateOrderId();

        // Create a payment summary template
        const paymentTemplate = {
            userId,
            pdfFile,
            printType,
            pageCount,
            ratePerPage: rate,
            totalAmount: amountToPay,
            orderId,
            message: 'This is your payment summary template.',
        };

        console.log('Payment details:', paymentTemplate); // Log payment details for debugging

        // Attach payment summary to the request object for the next middleware
        req.paymentSummary = paymentTemplate;

        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to simulate counting pages in a PDF file
const countPdfPages = async () => {
    // Simulate counting pages in a PDF file (replace with actual logic)
    return new Promise((resolve) => {
        setTimeout(() => {
            const pageCount = Math.floor(Math.random() * 100) + 1; // Random page count between 1 and 100
            resolve(pageCount);
        }, 1000); // Simulate a delay of 1 second
    });
};

// Function to handle payment processing
export const pay = async (req, res, next) => {
    try {
        const { totalAmount } = req.paymentSummary; // Extract the total amount from the payment summary

        if (!totalAmount) {
            return res.status(400).json({ message: 'Total amount is required' });
        }

        // Simulate payment processing (replace with actual payment gateway logic)
        const paymentResult = await processPayment(totalAmount);

        if (paymentResult.success) {
            console.log('Payment processed successfully:', paymentResult.details);

            // Attach payment details to the request object for the next middleware
            req.paymentDetails = paymentResult.details;

            next(); // Proceed to the next middleware
        } else {
            res.status(500).json({ message: 'Payment processing failed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Simulate payment processing function
const processPayment = async (amount) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                details: {
                    paymentId: 'PAY12345',
                    amount,
                    status: 'success',
                },
            });
        }, 1000); // Simulate a delay of 1 second
    });
};

// Function to verify payment
export const verifypayment = async (req, res, next) => {
    try {
        const { paymentId } = req.paymentDetails; // Extract the payment ID from the payment details

        if (!paymentId) {
            return res.status(400).json({ message: 'Payment ID is required' });
        }

        // Simulate payment verification (replace with actual payment gateway logic)
        const verificationResult = await verifyPayment(paymentId);

        if (verificationResult.success) {
            // Attach verification details to the request object for the next middleware
            req.verificationDetails = verificationResult.details;
            console.log('Payment verified successfully:', verificationResult.details);


            next(); // Proceed to the next middleware
        } else {
            res.status(500).json({ message: 'Payment verification failed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Simulate payment verification function
const verifyPayment = async (paymentId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                details: {
                    paymentId,
                    status: 'verified',
                },
            });
        }, 1000); // Simulate a delay of 1 second
    });
};


        
