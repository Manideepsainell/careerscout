import mongoose from "mongoose";
import dotenv from "dotenv";

import runDiscovery
  from "../services/discoveryRunner.js";

import expireJobs
  from "./expireJobs.js";

dotenv.config();

const start = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB Connected"
    );

    await runDiscovery();

    await expireJobs();

    process.exit(0);

  } catch (error) {

    console.error(
      error
    );

    process.exit(1);
  }
};

start();