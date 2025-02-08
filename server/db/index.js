import mongoose, { mongo } from "mongoose";
import { databaseURL } from "../environment.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(databaseURL);
    console.log(`MongoDB connected! DB host: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit();
  }
};

export default connectDB;
