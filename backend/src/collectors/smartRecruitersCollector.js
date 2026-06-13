import axios from "axios";

import {
  buildSmartRecruitersEndpoint,
} from "../utils/smartRecruiters.js";

const collectSmartRecruitersJobs = async (
  company
) => {
  console.log(
    `Smart Recruiter collector running for ${company.name}`
  );

const endpoint =
  buildSmartRecruitersEndpoint(
    company.careersUrl
  );

  console.log(endpoint);

  const response = await axios.get(
    endpoint
  );

  console.log(
    `Retrieved ${response.data.content.length} jobs`
  );

  return response.data.content.map(
    (job) => ({
      title: job.name,

      company: company._id,

      location:
        job.location?.fullLocation,

      jobType:
        job.typeOfEmployment?.label,

      experience:
        job.experienceLevel?.label,

      externalJobId: String(job.id),

      source: "SMARTRECRUITERS",

      jobUrl: job.ref,
    })
  );
};

export default collectSmartRecruitersJobs;