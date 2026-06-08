import connectDB from "../config/db.js";
import Company from "../models/Company.js";
import collectSmartRecruitersJobs from "../collectors/smartRecruitersCollector.js";
import dotenv from "dotenv";

dotenv.config();
const testSmartRecruiters = async () => {
  await connectDB();

  const company = await Company.findOne({
    name: "Freshworks",
  });

  const jobs =
    await collectSmartRecruitersJobs(company);

  console.log(jobs[0]);

  console.log(
    `Total jobs: ${jobs.length}`
  );

  process.exit(0);
};

testSmartRecruiters();