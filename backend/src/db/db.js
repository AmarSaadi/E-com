import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
async function connectDB() {
    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        // exit process so the issue is visible and can be restarted after fix
        process.exit(1);
    }
    
}
export default connectDB;