import dotenv from "dotenv";
import connectDB from "../src/config/db.js";
import Job from "../src/models/Job.js";
import validateJob from "../src/validity/validateJob.js";
import Company from "../src/models/Company.js";

dotenv.config();

await connectDB();

const company = await Company.findOne({ name: "Salesforce" });

const job = await Job.findOne({
  company: company._id,
  source: "WORKDAY",
});

if (!job) {
  console.log("No Workday job found.");
  process.exit(0);
}


console.log("=================================");
console.log("Testing Job Validity");
console.log("=================================\n");

console.log("Title   :", job.title);
console.log("Source  :", job.source);
console.log("URL     :", job.detailUrl);

const result = await validateJob(job);

console.log("\nResult");
console.log("Validity :", result.validity);
console.log("Reason   :", result.reason);
console.log("Checked  :", result.checkedAt);

process.exit(0);