import mongoose from "mongoose";
import { logger } from "@/app/lib/logger";

const connectMongoDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI;

    //logger.log("Checking MongoDB URI...");
    //console.log("MONGODB_URI:", uri ? "Loaded ✅" : "Missing ❌");
    //logger.log("MONGODB_URI:", uri ? `Loaded ✅: ${uri}` : "Missing ❌");

    if (!uri) throw new Error("MONGODB_URI is not defined");

    logger.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    logger.log("Connected to MongoDB ✅");
  } catch (error) {
    logger.error("MongoDB connection error:", (error as Error).message);
  }
};

export default connectMongoDB;
