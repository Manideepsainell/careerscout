import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Job from "../models/Job.js";

import categorizeRole
from "../utils/jobCategorizer.js";

import getEligibilityLevel
from "../utils/eligibilityTagger.js";

dotenv.config();

const main = async () => {
  await connectDB();

  const jobs =
    await Job.find({});
      console.log(
    `Found ${jobs.length} jobs`
  );

  let updatedCount = 0;

  for (const job of jobs) {
        job.roleCategory =
      categorizeRole(job.title);

    job.eligibilityLevel =
      getEligibilityLevel(job.title);

    await job.save();

    updatedCount++;
        if (
      updatedCount % 100 === 0
    ) {
      console.log(
        `${updatedCount} jobs updated`
      );
    }
      }

  console.log(
    `Backfilled ${updatedCount} jobs`
  );

  process.exit(0);
};

main().catch(console.error);