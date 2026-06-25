import getCapgeminiJobs
  from "../utils/capgemini.js";

const collectCapgeminiJobs =
  async (company) => {

    const jobs =
      await getCapgeminiJobs(
        company.openPositionsUrl
      );

    console.log(
      `Retrieved ${jobs.length} jobs`
    );

    return jobs.map((job) => ({

      title:
        job.title,

      company:
        company._id,

      location:
        job.location ||
        "India",

      source:
        "CAPGEMINI",

      externalJobId:
        String(job.id),

      jobUrl:
        company.careersUrl,

      description:
        job.description || "",

      jobType:
        job.contract_type ||
        "Full Time",

      postedDate:
  job.updated_at
    ? new Date(job.updated_at)
    : null,
    }));
  };

export default collectCapgeminiJobs;