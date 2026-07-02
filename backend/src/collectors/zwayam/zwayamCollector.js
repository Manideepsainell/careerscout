import getZwayamJobs
  from "../../utils/zwayam.js";

const collectZwayamJobs =
  async (company) => {

  

    const jobs =
      await getZwayamJobs(
        company.openPositionsUrl,
        company.companyId,
        company.domain
      );

    return jobs.map(({ _source: job }) => ({
  title:
    job.jobTitle || "Untitled",

  company:
    company._id,

  location:
    job.location ||
    job.city ||
    "Not Specified",

  source:
    "ZWAYAM",

  externalJobId:
    String(job.id),

  jobUrl:
    `https://${company.domain}/${job.jobUrl}?id=${job.id}`,

  description:
    job.shortDescription || "",

  department:
    job.departmentName || "",

  jobType:
    job.jobType === "J"
      ? "Full Time"
      : "",

  experience:
    job.experienceUIField ||
    job.minYrsOfExperience ||
    "",

  postedDate:
    job.createdDate
      ? new Date(job.createdDate)
      : null,

  skills:
    job.jdSkillsKnownList ||
    [],
}));
  };

export default collectZwayamJobs;