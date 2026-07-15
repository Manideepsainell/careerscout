import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Job from "../models/Job.js";

import categorizeRole
from "../intelligence/jobCategorizer.js";

import getEligibilityLevel
from "../intelligence/eligibilityTagger.js";

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
  const roleCategory = categorizeRole(
    job.title,
    job.description
  );

  const eligibilityLevel = getEligibilityLevel(
    job.title
  );

await Job.updateOne(
  {
    _id: job._id,
  },
  {
    $set: {
      roleCategory,
      eligibilityLevel,
    },
  }
);

  updatedCount++;

  if (updatedCount % 100 === 0) {
    console.log(`${updatedCount} jobs updated`);
  }
}
  console.log(
    `Backfilled ${updatedCount} jobs`
  );

  process.exit(0);
};

main().catch(console.error);