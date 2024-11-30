import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://michaelobe3:DDaCSxzJjecCcYTW@cluster0.0oby0.mongodb.net/Payfrica';

// Connect to MongoDB Atlas
export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        const err = error as Error
        console.error('MongoDB connection error:', err.message || error);
        process.exit(1);
    }
};

export const disconnectDB = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected successfully');
    } catch (error) {
        const err = error as Error
        console.error('Error disconnecting MongoDB:', err.message || error);
    }
};
