import Job from "../models/Job.js";
import checkJobValidity from "./checkJobValidity.js";

export default async function validateJob(job) {
  const result = await checkJobValidity(job);

  await Job.findByIdAndUpdate(job._id, {
    validity: result.validity,
    validityReason: result.reason,
    lastValidatedAt: result.checkedAt,
  });

  return result;
}