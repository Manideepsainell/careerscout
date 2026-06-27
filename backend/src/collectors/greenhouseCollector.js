import axios from "axios";
import {
  buildGreenhouseJobsEndpoint,
} from "../utils/greenhouse.js";

const collectGreenHouseJobs = async (
  company
) => {
  console.log(
    `GH collector running for ${company.name}`
  );

const endpoint =
  buildGreenhouseJobsEndpoint(
    company.openPositionsUrl ||
    company.careersUrl
  );

  console.log(endpoint);

  const response = await axios.get(
    endpoint
  );

  console.log(
    `Retrieved ${response.data.jobs.length} jobs`
  );
  
  return response.data.jobs.map((job) => ({
  title: job.title,

  company: company._id,

  location:
    job.location?.name ||
    "Not Specified",

  externalJobId:
    String(job.id),

  source:
    "GREENHOUSE",

  jobUrl:
    job.absolute_url,

  postedDate:
    job.first_published
      ? new Date(job.first_published)
      : job.updated_at
      ? new Date(job.updated_at)
      : null,
}));
};

export default collectGreenHouseJobs;