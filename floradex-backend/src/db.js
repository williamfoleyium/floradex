import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Debugging: Check if MONGODB_URI is loaded
console.log("MongoDB URI:", process.env.MONGODB_URI || "Not found");

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined. Check your .env file.");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
