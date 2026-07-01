import axios from "axios";
import {
  buildGreenhouseJobsEndpoint,
} from "../utils/greenhouse.js";

const collectGreenHouseJobs = async (
  company
) => {
  
try{
const endpoint =
  buildGreenhouseJobsEndpoint(
    company.openPositionsUrl ||
    company.careersUrl
  );



  const response = await axios.get(
    endpoint
  );

  return response.data.jobs.map((job) => ({
  title: job.title,

  company: company._id,

  location:
    job.location?.name ||
    "Not Specified",

  externalJobId: String(job.id),

  source: "GREENHOUSE",

  jobUrl: job.absolute_url,

  postedDate:
    job.first_published
      ? new Date(job.first_published)
      : job.updated_at
      ? new Date(job.updated_at)
      : null,

  description:
    job.content || "",

  experience:
    "Not Specified",

  jobType: "",

  salary: "",

  primaryLocation:
    job.location?.name || "",

  secondaryLocations: [],

  hasMultipleLocations: false,
}));
}
catch (error) {
    console.error(
      `${company.name}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export default collectGreenHouseJobs;