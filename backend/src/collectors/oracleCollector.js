import axios from "axios";

import {
  buildOracleJobsEndpoint,
} from "../utils/oracle.js";

const collectOracleJobs = async (
  company
) => {
  let offset = 0;
  let allJobs = [];

  while (true) {
    const endpoint =
      buildOracleJobsEndpoint(
        company,
        offset
      );

    const response =
      await axios.get(endpoint);

    const search =
      response.data.items?.[0];

    const jobs =
      search?.requisitionList || [];

    if (!jobs.length) {
      break;
    }
  
    const maxJobs =
      company.oracleConfig?.maxJobs;

    if (maxJobs) {
      const remaining =
        maxJobs - allJobs.length;

      allJobs.push(
        ...jobs.slice(0, remaining)
      );

      if (
        allJobs.length >= maxJobs
      ) {
        break;
      }
    } else {
      allJobs.push(...jobs);
    }

    const totalJobs =
      search.TotalJobsCount || 0;

    const limit =
      search.Limit || 25;

    offset += limit;

    if (offset >= totalJobs) {
      break;
    }
  }

  const parsed = new URL(
    company.openPositionsUrl
  );

  const siteName =
    parsed.pathname.split("/")[5];

  return allJobs.map((job) => ({
    title: job.Title,
    company: company._id,

    location:
      job.PrimaryLocation ||
      "Not Specified",

    source: "ORACLE",

    externalJobId: job.Id,

    jobUrl: `${parsed.origin}/hcmUI/CandidateExperience/en/sites/${siteName}/job/${job.Id}`,

    description:
      job.ShortDescriptionStr || "",

    postedDate: job.PostedDate
      ? new Date(job.PostedDate)
      : null,
  }));
};

export default collectOracleJobs;