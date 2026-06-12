import getTecholutionJobs
  from "../utils/techolution.js";

const collectTecholutionJobs =
  async (company) => {

    console.log(
      `Techolution collector running for ${company.name}`
    );

    const jobs =
      await getTecholutionJobs(
        company.openPositionsUrl
      );

    console.log(
      `Retrieved ${jobs.length} jobs`
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
          : new Date(),
    }));
  };

export default collectTecholutionJobs;