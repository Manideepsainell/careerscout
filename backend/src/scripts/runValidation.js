import mongoose from "mongoose";
import dotenv from "dotenv";
import validateJobs from "../services/validateJobs.js";

dotenv.config();

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await validateJobs({
      source: "ASHBY",
      validity: "UNKNOWN",
    });

    console.log("VALIDATION FUNCTION RETURNED");

    await mongoose.disconnect();

    console.log("MongoDB Disconnected");

    process.exit(0);
  } catch (error) {
    console.error("VALIDATION RUN FAILED:");
    console.error(error);

    process.exit(1);
  }
};

start();