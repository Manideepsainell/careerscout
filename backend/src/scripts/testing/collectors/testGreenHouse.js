import connectDB from "../../../config/db.js";
import Company from "../../../models/Company.js";
import collectGreenHouseJobs from "../../../collectors/greenhouseCollector.js";
import dotenv from "dotenv";

dotenv.config();
const testGreenhouse = async () => {
  await connectDB();

  const company = await Company.findOne({
    name: "Postman",
  });

  const jobs =
    await collectGreenHouseJobs(company);
  console.log(
    `Total jobs: ${jobs.length}`
  );

  process.exit(0);
};

testGreenhouse();