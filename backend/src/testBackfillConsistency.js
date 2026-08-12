import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Job from "./models/Job.js";

import categorizeRole from "./intelligence/jobCategorizer.js";
import getEligibilityLevel from "./intelligence/eligibilityTagger.js";
import getExperienceBand from "./intelligence/getExperienceBand.js";

dotenv.config();

const main = async () => {
  await connectDB();

  const jobs = await Job.find({
    _id: {
      $in: [
        "6a7c72601e70e79fabd7a03e",
        "6a7c72761e70e79fabd7a7b4",
        "6a7c727b1e70e79fabd7a8d4",
      ],
    },
  });

  for (const job of jobs) {
    console.log("\n--------------------------------");
    console.log("TITLE:", job.title);
console.log("\nDESCRIPTION:");
console.log(job.description);
    console.log("DB:");
    console.log("  roleCategory:", job.roleCategory);
    console.log("  eligibilityLevel:", job.eligibilityLevel);
    console.log("  experienceBand:", job.experienceBand);

    console.log("CURRENT CLASSIFIER:");
    console.log(
      "  roleCategory:",
      categorizeRole(job.title, job.description)
    );
    console.log(
      "  eligibilityLevel:",
      getEligibilityLevel(job.title)
    );
    console.log(
      "  experienceBand:",
      getExperienceBand(job.title)
    );
  }

  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});