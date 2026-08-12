import "dotenv/config";
import mongoose from "mongoose";

import Job from "../models/Job.js";
import getLocationTier from "../intelligence/LocationTier.js";

const BATCH_SIZE = 500;

try {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected to MongoDB");

  const jobs = await Job.find({
    source: "GREENHOUSE",
  }).lean();

  console.log(`Found ${jobs.length} Greenhouse jobs`);

  let updated = 0;

  for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
    const batch = jobs.slice(i, i + BATCH_SIZE);

    const operations = batch
      .filter((job) => {
        const newTier = getLocationTier(job.location);
        return job.locationTier !== newTier;
      })
      .map((job) => ({
        updateOne: {
          filter: { _id: job._id },
          update: {
            $set: {
              locationTier: getLocationTier(job.location),
            },
          },
        },
      }));

    if (operations.length > 0) {
      await Job.bulkWrite(operations);
      updated += operations.length;
    }

    console.log(
      `${Math.min(i + BATCH_SIZE, jobs.length)}/${jobs.length} processed`
    );
  }

  console.log(`\n✅ Updated ${updated} Greenhouse jobs`);

  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}