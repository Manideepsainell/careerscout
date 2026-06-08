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
    buildOracleJobsEndpoint();

  console.log(endpoint);

  const response = await axios.get(
    endpoint
  );

  const requisitions =
    response.data.items[0]
      .requisitionList;

  console.log(
    `Retrieved ${requisitions.length} jobs`
  );
return requisitions.map((job) => ({
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