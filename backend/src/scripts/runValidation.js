import mongoose from "mongoose";
import dotenv from "dotenv";
import validateJobs from "../services/validateJobs.js";

dotenv.config();

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

  await validateJobs({
  source: "GREENHOUSE",
  validity: "UNKNOWN",
});
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();