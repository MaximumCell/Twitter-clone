import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load env variables

const connectMongoDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

export default connectMongoDb;
