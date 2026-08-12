import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Job from "../models/Job.js";

import categorizeRole from "../intelligence/jobCategorizer.js";
import getEligibilityLevel from "../intelligence/eligibilityTagger.js";
import getExperienceBand from "../intelligence/getExperienceBand.js";

dotenv.config();

const BATCH_SIZE = 500;

const main = async () => {
  await connectDB();

  const jobs = await Job.find({
    source: "GREENHOUSE",
  }).lean();

  console.log(`Found ${jobs.length} Greenhouse jobs`);

  let updatedCount = 0;

  for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
    const batch = jobs.slice(i, i + BATCH_SIZE);

    const operations = batch.map((job) => ({
      updateOne: {
        filter: { _id: job._id },
        update: {
          $set: {
            roleCategory: categorizeRole(
              job.title,
              job.description
            ),

            eligibilityLevel: getEligibilityLevel(
              job.title
            ),

            experienceBand: getExperienceBand(
              job.title
            ),
          },
        },
      },
    }));

    await Job.bulkWrite(operations);

    updatedCount += batch.length;

    console.log(
      `${updatedCount}/${jobs.length} Greenhouse jobs updated`
    );
  }

  console.log(
    `\n✅ Successfully backfilled ${updatedCount} Greenhouse jobs`
  );

  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});