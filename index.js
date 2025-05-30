import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/db/db.connect.js';
import app from './src/app.js'; // Import the app from app.js

const PORT = process.env.PORT || 8080;


(async () => {
    await connectDB();// Connect to the database
    
    app.listen(PORT, () => {// Start the server
    console.log(`Server is running on http://localhost:${PORT}`);
});
})();
const path = require("path");

// Serve static files from React
app.use(express.static(path.join(__dirname, "build")));

// For any unknown route, return React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


