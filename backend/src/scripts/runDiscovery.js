import mongoose from "mongoose";
import dotenv from "dotenv";
import runPostDiscoveryPipeline from "../services/postDiscoveryPipeline.js";
console.log("1. File loaded");

import runDiscovery from "../services/discoveryRunner.js";

console.log("2. Imports completed");

dotenv.config();

console.log("3. dotenv loaded");

const start = async () => {

  console.log("4. Inside start()");

  try {

    console.log("5. Connecting to MongoDB");

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log("6. MongoDB Connected");

    console.log("7. Calling runDiscovery()");

    await runDiscovery();
await runPostDiscoveryPipeline();
    console.log("8. runDiscovery() finished");

    console.log("9. Exiting with code 0");

    process.exit(0);

  } catch (error) {

    console.log("10. ERROR CAUGHT");

    console.error(error);

    process.exit(1);

  }

};

start();