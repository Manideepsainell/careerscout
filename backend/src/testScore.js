import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Job from "./models/Job.js";
import { calculateScore } from "./controllers/jobController.js";
import getFreshness from "./intelligence/getFreshness.js";
import getFreshnessScore from "./intelligence/getFreshnessScore.js";

dotenv.config();

const main = async () => {
  await connectDB();

  const job = await Job.findOne({
    title: "SDE 2 - Fullstack",
  }).lean();
console.log(calculateScore(job));
  console.log("TITLE:", job.title);
  console.log("POSTED:", job.postedDate);
  console.log("FRESHNESS:", getFreshness(job.postedDate));
  console.log(
    "FRESHNESS SCORE:",
    getFreshnessScore(job.postedDate)
  );

  process.exit(0);
};

main().catch(console.error);