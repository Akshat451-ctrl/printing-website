import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongo_url = process.env.MONGO_CONN;

const connectDB = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log('MongoDB connected......');
    } catch (err) {
        console.error('MongoDB Connection error..', err);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
