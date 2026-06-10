import Company from "../models/Company.js";
import collectAtlassianJobs from "../collectors/atlassianCollector.js";
import connectDB from "../config/db.js";

await connectDB();

const company =
  await Company.findOne({
    name: "Atlassian",
  });

const jobs =
  await collectAtlassianJobs(
    company
  );

console.log(
  "Jobs fetched:",
  jobs.length
);

process.exit(0);