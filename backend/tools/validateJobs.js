import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../src/config/db.js";
import validateJobs from "../src/services/validateJobs.js";

dotenv.config();

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("exit", (code) => {
  console.log(`Process exited with code ${code}`);
});

try {
  await connectDB();

  await validateJobs({
  source: "GREENHOUSE",
  validity: "UNKNOWN"
});
  
} catch (err) {
  console.error("Fatal Error:", err);
} finally {
  await mongoose.disconnect();
  console.log("MongoDB disconnected.");
}