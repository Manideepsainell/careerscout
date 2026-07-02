import connectDB from "../config/db.js";
import Company from "../models/Company.js";
import collectEightfoldJobs from "../collectors/eightfoldCollector.js";
import dotenv from "dotenv";

dotenv.config();

const testEightfold = async () => {
  await connectDB();

  const company = await Company.findOne({
    jobBoardType: "EIGHTFOLD",
  });

  const jobs =
    await collectEightfoldJobs(company);

  console.log(
    `Total jobs: ${jobs.length}`
  );

  console.log(jobs[0]);

  process.exit(0);
};

testEightfold();