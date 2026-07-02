import dotenv from "dotenv";

dotenv.config();

import connectDB
  from "../config/db.js";

import Company
  from "../models/Company.js";

import collectSuccessFactorsJobs
  from "../collectors/successFactorsCollector.js";

await connectDB();

const company =
  await Company.findOne({
    name: "HCLTech",
  });

const jobs =
  await collectSuccessFactorsJobs(
    company
  );

console.log(
  "Jobs fetched:",
  jobs.length
);

console.log(jobs[0]);

process.exit(0);