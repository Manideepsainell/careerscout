import "dotenv/config";
import mongoose from "mongoose";

import Job from "../models/Job.js";
import fetchAshbyPublicMetadata from "../collectors/ashby/fetchAshbyPublicMetadata.js";

const BATCH_SIZE = 5;
const DELAY_BETWEEN_BATCHES = 2000;

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const backfillAshbyPostedDate = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  console.log(
    "\n========== ASHBY POSTED DATE BACKFILL ==========\n"
  );

  const jobs = await Job.find({
    source: "ASHBY",
    $or: [
      { postedDate: null },
      { postedDate: { $exists: false } },
    ],
  }).select("_id title jobUrl postedDate");

  console.log(`Jobs needing backfill: ${jobs.length}`);
  console.log(`Batch Size: ${BATCH_SIZE}\n`);

  let processed = 0;
  let updated = 0;
  let missing = 0;
  let failed = 0;

  for (
    let i = 0;
    i < jobs.length;
    i += BATCH_SIZE
  ) {
    const batch = jobs.slice(
      i,
      i + BATCH_SIZE
    );

    console.log(
      `Starting batch ${
        Math.floor(i / BATCH_SIZE) + 1
      } (${batch.length} jobs)`
    );

    const results = await Promise.allSettled(
      batch.map(async (job) => {
        try {
          const metadata =
            await fetchAshbyPublicMetadata(job);

          if (!metadata.postedDate) {
            missing++;

            console.log(
              `[NO DATE] ${job.title}`
            );

            return;
          }

          await Job.findByIdAndUpdate(
            job._id,
            {
              postedDate:
                metadata.postedDate,
            }
          );

          updated++;

          console.log(
            `[UPDATED] ${job.title} → ${metadata.postedDate}`
          );
        } catch (error) {
          failed++;

          console.error(
            `[FAILED] ${job.title}`
          );

          console.error(
            error.code || error.message
          );
        }
      })
    );

    results.forEach((result) => {
      if (result.status === "rejected") {
        failed++;

        console.error(
          "[Promise Rejected]",
          result.reason
        );
      }
    });

    processed += batch.length;

    console.log(
      `Progress: ${processed}/${jobs.length}`
    );

    console.log(
      `Updated: ${updated} | Missing: ${missing} | Failed: ${failed}\n`
    );

    if (i + BATCH_SIZE < jobs.length) {
      await sleep(DELAY_BETWEEN_BATCHES);
    }
  }

  console.log(
    "\n========== BACKFILL COMPLETE =========="
  );

  console.log(`Processed : ${processed}`);
  console.log(`Updated   : ${updated}`);
  console.log(`Missing   : ${missing}`);
  console.log(`Failed    : ${failed}`);

  await mongoose.disconnect();

  console.log("\nMongoDB Disconnected");
};

backfillAshbyPostedDate().catch(
  async (error) => {
    console.error(
      "\n========== BACKFILL FAILED =========="
    );

    console.error(error);

    try {
      await mongoose.disconnect();
    } catch {}

    process.exit(1);
  }
);