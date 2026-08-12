import Job from "../models/Job.js";
import checkJobValidity from "./checkJobValidity.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MAX_RETRIES = 3;

const RETRYABLE_REASONS = new Set([
  "HTTP_403",
  "HTTP_429",
  "ECONNABORTED",
]);

export default async function validateJob(job) {
  let result = {
    validity: "UNKNOWN",
    reason: "VALIDATION_FAILED",
    checkedAt: new Date(),
  };

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      result = await checkJobValidity(job);
    } catch (err) {
      console.error(
        `[Validation Error] ${job.source} | ${job.company || "Unknown Company"} | ${job.title}`
      );

      console.error(err);

      result = {
        validity: "UNKNOWN",
        reason: err.code || err.name || "VALIDATION_EXCEPTION",
        checkedAt: new Date(),
      };
    }

    // Finished if we have a definitive answer
    if (
      result.validity === "ALIVE" ||
      result.validity === "DEAD"
    ) {
      break;
    }

    // Don't retry non-retryable UNKNOWNs
    if (!RETRYABLE_REASONS.has(result.reason)) {
      break;
    }

    // No retries remaining
    if (attempt === MAX_RETRIES) {
      break;
    }

    const delay = 2 ** attempt * 1000;

    console.log(`
[Retry ${attempt}/${MAX_RETRIES}]
Source  : ${job.source}
Company : ${job.company || "Unknown"}
Job     : ${job.title}
Reason  : ${result.reason}
Waiting : ${delay} ms
`);

    await sleep(delay);
  }

  try {
    await Job.findByIdAndUpdate(job._id, {
      validity: result.validity,
      validityReason: result.reason,
      lastValidatedAt: result.checkedAt,
    });
  } catch (err) {
    console.error(
      `[Mongo Update Failed] ${job._id} | ${job.title}`
    );
    console.error(err);
  }

  return result;
}