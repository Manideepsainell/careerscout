import "dotenv/config";
import mongoose from "mongoose";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import getLocationTier from "../intelligence/LocationTier.js";

const BATCH_SIZE = 500;

try {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected to MongoDB");

  const jobs = await Job.find({
    source: "ASHBY",
  })
    .populate("company", "locationMetadata")
    .lean();

  console.log(
    `Found ${jobs.length} Ashby jobs`
  );

  let updated = 0;
  let unchanged = 0;
  let missingCompany = 0;

  const distribution = {
    TIER_1: 0,
    TIER_2: 0,
    TIER_3: 0,
    TIER_4: 0,
    TIER_5: 0,
    OUTSIDE_INDIA: 0,
    UNKNOWN: 0,
  };

  for (
    let i = 0;
    i < jobs.length;
    i += BATCH_SIZE
  ) {
    const batch = jobs.slice(
      i,
      i + BATCH_SIZE
    );

    const operations = [];

    for (const job of batch) {
      if (!job.company) {
        missingCompany++;
      }

      const newTier = getLocationTier(
        job.location,
        job.primaryLocation,
        job.secondaryLocations,
        job.company?.locationMetadata || null
      );

      distribution[newTier]++;

      if (job.locationTier === newTier) {
        unchanged++;
        continue;
      }

      operations.push({
        updateOne: {
          filter: {
            _id: job._id,
          },
          update: {
            $set: {
              locationTier: newTier,
            },
          },
        },
      });
    }

    if (operations.length > 0) {
      await Job.bulkWrite(operations);
      updated += operations.length;
    }

    console.log(
      `${Math.min(
        i + BATCH_SIZE,
        jobs.length
      )}/${jobs.length} processed`
    );
  }

  console.log(
    "\n========== ASHBY LOCATION TIER BACKFILL =========="
  );

  console.log(
    `Processed      : ${jobs.length}`
  );

  console.log(
    `Updated        : ${updated}`
  );

  console.log(
    `Unchanged      : ${unchanged}`
  );

  console.log(
    `Missing company: ${missingCompany}`
  );

  console.log(
    "\n========== TIER DISTRIBUTION =========="
  );

  console.log(
    `TIER_1         : ${distribution.TIER_1}`
  );

  console.log(
    `TIER_2         : ${distribution.TIER_2}`
  );

  console.log(
    `TIER_3         : ${distribution.TIER_3}`
  );

  console.log(
    `TIER_4         : ${distribution.TIER_4}`
  );

  console.log(
    `TIER_5         : ${distribution.TIER_5}`
  );

  console.log(
    `OUTSIDE_INDIA  : ${distribution.OUTSIDE_INDIA}`
  );

  console.log(
    `UNKNOWN        : ${distribution.UNKNOWN}`
  );

  await mongoose.disconnect();

  console.log(
    "\nMongoDB Disconnected"
  );

  process.exit(0);
} catch (err) {
  console.error(
    "\nAshby location tier backfill failed:"
  );

  console.error(err);

  try {
    await mongoose.disconnect();
  } catch {}

  process.exit(1);
}