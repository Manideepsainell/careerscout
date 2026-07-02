import mongoose from "mongoose";
import dotenv from "dotenv";

import Job from "../models/Job.js";
import connectDB from "../config/db.js";

import getExperienceBand
from "../utils/getExperienceBand.js";

dotenv.config();

const backfill = async () => {
  await connectDB();

  const jobs = await Job.find();



  let updated = 0;

  for (const job of jobs) {
    const experienceBand =
      getExperienceBand(job.title);

    await Job.findByIdAndUpdate(
      job._id,
      {
        experienceBand,
      }
    );

    updated++;

    if (updated % 100 === 0) {
      
    }
  }

  
  process.exit(0);
};

backfill();