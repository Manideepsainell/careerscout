import axios from "axios";

import {
  buildOracleJobsEndpoint,
} from "../utils/oracle.js";

const collectOracleJobs = async (
  company
) => {
  console.log(
    `Oracle collector running for ${company.name}`
  );

 const endpoint =
  buildOracleJobsEndpoint(
    company.openPositionsUrl
  );


let offset = 0;
let allJobs = [];

while (true) {
  const endpoint =
    buildOracleJobsEndpoint(
      company.openPositionsUrl,
      offset
    );

  const response =
    await axios.get(endpoint);

  const jobs =
    response.data.items?.[0]
      ?.requisitionList || [];

  console.log(
    `Offset ${offset}: ${jobs.length}`
  );

  if (!jobs.length) {
    break;
  }

  allJobs.push(...jobs);

  if (jobs.length < 200) {
    break;
  }

  offset += 200;
}
return allJobs.map((job) => ({
  title: job.Title,
  company: company._id,

  location:
    job.PrimaryLocation ||
    "Not Specified",

  source: "ORACLE",

  externalJobId: job.Id,

  jobUrl: `https://careers.oracle.com/en/sites/jobsearch/job/${job.Id}`,

  description:
    job.ShortDescriptionStr || "",

  postedDate: job.PostedDate,
}));
};

export default collectOracleJobs;