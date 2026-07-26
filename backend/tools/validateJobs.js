import dotenv from "dotenv";
import connectDB from "../src/config/db.js";
import Job from "../src/models/Job.js";
import validateJob from "../src/validity/validateJob.js";

dotenv.config();

await connectDB();

const BATCH_SIZE = 5;

const jobs = await Job.find({
  source: "GREENHOUSE",
  validity: "UNKNOWN"
});




console.log(`Found ${jobs.length} jobs`);
console.log(`Batch Size: ${BATCH_SIZE}\n`);

let alive = 0;
let dead = 0;
let unknown = 0;
let failed = 0;
let processed = 0;

for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
  const batch = jobs.slice(i, i + BATCH_SIZE);

  const results = await Promise.allSettled(
    batch.map(async (job) => {
      const result = await validateJob(job);

      if (result.validity === "ALIVE") alive++;
      else if (result.validity === "DEAD") dead++;
      else unknown++;
    })
  );

  results.forEach((result) => {
    if (result.status === "rejected") {
      failed++;
    }
  });

  processed += batch.length;

  console.log(`Progress: ${processed}/${jobs.length}`);

  // Wait before the next batch (but not after the last one)
  if (i + BATCH_SIZE < jobs.length) {
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}
console.log("\n========== SUMMARY ==========");
console.log(`Validated : ${jobs.length}`);
console.log(`Alive     : ${alive}`);
console.log(`Dead      : ${dead}`);
console.log(`Unknown   : ${unknown}`);
console.log(`Failed    : ${failed}`);