import axios from "axios";
import {
  buildWorkdayJobsEndpoint,
  buildWorkdayJobUrl,
} from "../utils/workday.js";
const collectWorkdayJobs = async (company) => {
  console.log(`WORKDAY collector running for ${company.name}`);
  const careersUrl = company.openPositionsUrl;
const endpoint =
  buildWorkdayJobsEndpoint(careersUrl);

console.log(endpoint);

const response = await axios.post(
  endpoint,
  {
    limit: 20,
    offset: 0,
  }
);
console.log(
  `${company.name} total jobs:`,
  response.data.total
);

  const jobs = response.data.jobPostings.map((posting) => ({
    title: posting.title,

    company: company._id,

    location: posting.locationsText,
externalJobId:
  posting.bulletFields?.[0] || "",
    source: "WORKDAY",

    jobUrl: buildWorkdayJobUrl(
  company.openPositionsUrl,
  posting.externalPath
),

  }));
  console.log(jobs[0]);

  console.log(`Retrieved ${jobs.length} jobs`);
  

  return jobs;
};

export default collectWorkdayJobs;