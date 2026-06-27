import getTecholutionJobs
  from "../utils/techolution.js";

const collectTecholutionJobs =
  async (company) => {


    const jobs =
      await getTecholutionJobs(
        company.openPositionsUrl
      );

    return jobs.map((job) => ({
      title:
        job.roleName,

      company:
        company._id,

      location:
        job.locations ||
        "Not Specified",

      source:
        "TECHOLUTION",

      externalJobId:
        String(job.id),

      jobUrl:
        "https://hire.techolution.com",

      description:
        job.roleDescription || "",

      jobType:
        job.employmentType,

      postedDate:
  job.createdAt
    ? new Date(job.createdAt)
    : null,
    }));
  };

export default collectTecholutionJobs;