import connectDB from "../config/db.js";
import Job from "../models/Job.js";
import categorizeRole from "../utils/jobCategorizer.js";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  await connectDB();

 const jobs = await Job.find({
  title: {
    $regex:
      "engineer|developer|software|backend|frontend|react|node|java|qa",
    $options: "i",
  },
})
  .select("title")
  .limit(100);

  for (const job of jobs) {
    console.log(
      `${job.title} -> ${categorizeRole(job.title)}`
    );
  }

  process.exit(0);
};

main().catch(console.error);