import dotenv from "dotenv";

dotenv.config();

import connectDB
  from "../config/db.js";

import Company
  from "../models/Company.js";

import collectLeverJobs
  from "../collectors/leverCollector.js";

await connectDB();

const company =
  await Company.findOne({
    name: "CRED",
  });

const jobs =
  await collectLeverJobs(
    company
  );

console.log(
  "Jobs fetched:",
  jobs.length
);

console.log(jobs[0]);

process.exit(0);