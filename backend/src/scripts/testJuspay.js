import dotenv from "dotenv";

dotenv.config();

import connectDB
  from "../config/db.js";

import Company
  from "../models/Company.js";

import collectJuspayJobs
  from "../collectors/juspayCollector.js";

await connectDB();

const company =
  await Company.findOne({
    name: "Juspay",
  });

const jobs =
  await collectJuspayJobs(
    company
  );

console.log(
  "Jobs fetched:",
  jobs.length
);

console.log(jobs[0]);

process.exit(0);