import Job from "../models/Job.js";
import validateJob from "../validity/validateJob.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BATCH_SIZE = 20;

const validateJobs = async (query = {}) => {
  let alive = 0;
  let dead = 0;
  let unknown = 0;
  let failed = 0;
  let processed = 0;

  const jobs = await Job.find(query);

  console.log(`Found ${jobs.length} jobs`);
  console.log(`Batch Size: ${BATCH_SIZE}\n`);

  for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
    const batch = jobs.slice(i, i + BATCH_SIZE);

    console.log(
      `Starting batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} jobs)`
    );

    const results = await Promise.allSettled(
      batch.map(async (job) => {
        try {
          const result = await validateJob(job);

          switch (result.validity) {
            case "ALIVE":
              alive++;
              break;

            case "DEAD":
              dead++;
              break;

            default:
              unknown++;
          }
        } catch (err) {
          failed++;

          console.error(
            `[Job Failed] ${job.source} | ${job.company || "Unknown"} | ${job.title}`
          );
          console.error(err);
        }
      })
    );

    results.forEach((result) => {
      if (result.status === "rejected") {
        failed++;
        console.error("Promise rejected:", result.reason);
      }
    });

    processed += batch.length;

    console.log(`Progress: ${processed}/${jobs.length}`);
    console.log("Batch complete.\n");

    if (i + BATCH_SIZE < jobs.length) {
      await sleep(1000);
    }
  }

  console.log("\n========== SUMMARY ==========");
  console.log(`Processed : ${processed}`);
  console.log(`Alive     : ${alive}`);
  console.log(`Dead      : ${dead}`);
  console.log(`Unknown   : ${unknown}`);
  console.log(`Failed    : ${failed}`);

  return {
    processed,
    alive,
    dead,
    unknown,
    failed,
  };
};

export default validateJobs;