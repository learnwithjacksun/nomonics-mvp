import mongoose from "mongoose";
import envFile from "./env.js";
import process from "process";

const connectDB = async () => {
    try {
        await mongoose.connect(envFile.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;