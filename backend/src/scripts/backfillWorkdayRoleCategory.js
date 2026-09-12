import "dotenv/config";
import mongoose from "mongoose";
import Job from "../models/Job.js";
import categorizeRole from "../intelligence/jobCategorizer.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const jobs = await Job.find(
      { source: "WORKDAY" },
      {
        _id: 1,
        title: 1,
        description: 1,
        roleCategory: 1,
      }
    );

    console.log(`Found ${jobs.length} Workday jobs`);

    let changed = 0;
    let unchanged = 0;

    const counts = {};

    for (const job of jobs) {
      const newCategory = categorizeRole(
        job.title,
        job.description
      );

      counts[newCategory] =
        (counts[newCategory] || 0) + 1;

      if (job.roleCategory === newCategory) {
        unchanged++;
        continue;
      }

      await Job.findByIdAndUpdate(job._id, {
        roleCategory: newCategory,
      });

      changed++;
    }

    console.log("\n========== WORKDAY ROLE CATEGORY BACKFILL ==========");
    console.log(`Processed : ${jobs.length}`);
    console.log(`Changed   : ${changed}`);
    console.log(`Unchanged : ${unchanged}`);

    console.log("\nCategory distribution:");

    for (const [category, count] of Object.entries(counts)) {
      console.log(`${category.padEnd(20)} ${count}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Backfill failed:", error);
    process.exit(1);
  }
};

run();