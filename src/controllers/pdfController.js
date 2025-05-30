import path from 'path';
import fs from 'fs';

// filepath: c:\Users\om sai ram\Desktop\PQM\Backend_Files\src\controllers\pdfController.js

export const sendpdf = async (req, res) => {
    try {
        // Retrieve the order object attached by the verifyorderid middleware
        const order = req.order;

        // Get the path to the PDF file from the order object
        const pdfFilePath = order.pdfFile;

        // Check if the file exists
        if (!fs.existsSync(pdfFilePath)) {
            return res.status(404).json({ message: 'PDF file not found' });
        }

        // Send the PDF file as a response
        res.sendFile(path.resolve(pdfFilePath), (err) => {
            if (err) {
                console.error('Error sending PDF file:', err);
                res.status(500).json({ message: 'Error sending PDF file' });
            }
        });
    } catch (error) {
        console.error('Error in sendpdf controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};