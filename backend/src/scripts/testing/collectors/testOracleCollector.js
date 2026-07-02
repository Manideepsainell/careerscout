import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Company from "../models/Company.js";

import collectOracleJobs from "../collectors/oracleCollector.js";

dotenv.config();

const testOracleCollector =
  async () => {
    await connectDB();

    const company =
      await Company.findOne({
        jobBoardType: "ORACLE",
      });

    const jobs =
      await collectOracleJobs(company);

    console.log(jobs[0]);

    console.log(
      `Total jobs: ${jobs.length}`
    );

    process.exit(0);
  };

testOracleCollector();