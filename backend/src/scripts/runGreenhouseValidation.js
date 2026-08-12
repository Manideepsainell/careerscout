import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import greenhouseValidation from "../services/greenhouseValidation.js";

dotenv.config();

try {
  await connectDB();

  await greenhouseValidation();
} catch (err) {
  console.error("Fatal Error:", err);
} finally {
  await mongoose.disconnect();
  console.log("MongoDB disconnected.");
}