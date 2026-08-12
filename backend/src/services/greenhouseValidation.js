import Job from "../models/Job.js";
import Company from "../models/Company.js";
import axios from "axios";
import {
  buildGreenhouseJobsEndpoint,
} from "../utils/greenhouse.js";

const greenhouseValidation = async () => {
  const jobs = await Job.find({
    source: "GREENHOUSE",
    validity: "UNKNOWN",
  });

  console.log(`Found ${jobs.length} Greenhouse jobs`);

  // Group jobs by company
  const jobsByCompany = new Map();

  for (const job of jobs) {
    const companyId = job.company?.toString();

    if (!companyId) {
      continue;
    }

    if (!jobsByCompany.has(companyId)) {
      jobsByCompany.set(companyId, []);
    }

    jobsByCompany.get(companyId).push(job);
  }

  console.log(
    `Companies to validate: ${jobsByCompany.size}`
  );

  let alive = 0;
  let dead = 0;
  let unknown = 0;
  let failed = 0;

  for (const [companyId, companyJobs] of jobsByCompany) {
    const company = await Company.findById(companyId);

    if (!company) {
      console.log(
        `Company not found: ${companyId}`
      );

      unknown += companyJobs.length;
      continue;
    }

    try {
      const endpoint =
        buildGreenhouseJobsEndpoint(
          company.openPositionsUrl ||
            company.careersUrl
        );

      console.log(
        `\nValidating: ${company.name}`
      );

      const response = await axios.get(
        endpoint,
        {
          timeout: 20000,
          params: {
            content: true,
          },
        }
      );

      const greenhouseJobs =
        response.data?.jobs || [];

      const currentJobIds = new Set(
        greenhouseJobs.map((job) =>
          String(job.id)
        )
      );

      console.log(
        `API jobs: ${currentJobIds.size}`
      );

      for (const job of companyJobs) {
        const exists = currentJobIds.has(
          String(job.externalJobId)
        );

        const validity = exists
          ? "ALIVE"
          : "DEAD";

        const reason = exists
          ? "GREENHOUSE_API_PRESENT"
          : "GREENHOUSE_API_MISSING";

        await Job.findByIdAndUpdate(job._id, {
          validity,
          validityReason: reason,
          lastValidatedAt: new Date(),
        });

        if (validity === "ALIVE") {
          alive++;
        } else {
          dead++;
        }
      }
    } catch (error) {
      console.error(
        `[Greenhouse Validation Failed] ${company.name}`
      );

      console.error(
        error.response?.status ||
          error.code ||
          error.message
      );

      unknown += companyJobs.length;
    }
  }

  console.log(
    "\n========== GREENHOUSE VALIDATION SUMMARY =========="
  );

  console.log(`Processed : ${alive + dead + unknown}`);
  console.log(`Alive     : ${alive}`);
  console.log(`Dead      : ${dead}`);
  console.log(`Unknown   : ${unknown}`);
  console.log(`Failed    : ${failed}`);

  return {
    processed: alive + dead + unknown,
    alive,
    dead,
    unknown,
    failed,
  };
};

export default greenhouseValidation;