import getAccentureJobs
  from "../utils/accenture.js";

const collectAccentureJobs =
  async (company) => {


    const jobs =
      await getAccentureJobs(
        company.openPositionsUrl
      );

 return jobs.map((job) => ({
  title: job.title,

  company: company._id,

  location:
    job.feedCity ||
    "Not Specified",

  source: "ACCENTURE",

  externalJobId: String(
    job.requisitionId ||
    job.guid
  ),

  jobUrl: job.jobDetailUrl
    ? job.jobDetailUrl.replace("{0}", "in-en")
    : "",

  description:
    job.jobDescriptionClean ||
    job.jobDescription ||
    "",

  jobType:
    job.employeeType ||
    "Full Time",

  postedDate: job.updateDate
    ? new Date(job.updateDate)
    : null,

  // ---------- Intelligence ----------

  department:
    job.function?.[0] ||
    "",

  team:
    job.businessArea ||
    "",

  workplace:
    job.remoteType
      ? job.remoteType.toUpperCase()
      : "",

  experience:
    job.yearsOfExperience ||
    "",

  salary: "",
}));
  };

export default collectAccentureJobs;