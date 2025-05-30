import express from 'express';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';
// import dash from './routes/dashBoard.js';
import cors from 'cors';
// Enable CORS
const app = express();

app.use(cors());
// Middleware
app.use(express.json());

// Ping route
app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});


// Using the auth routes
app.use('/auth', authRoutes);
app.use('/order', orderRoutes);
// app.use('/dash',dash);



// Export the app as default
export default app;

