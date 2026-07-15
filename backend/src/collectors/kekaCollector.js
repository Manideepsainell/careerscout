import getKekaJobs
  from "../utils/keka.js";

const collectKekaJobs =
  async (company) => {

   

    const jobs =
  await getKekaJobs(company);

   
   

   return jobs.map((job) => ({
  title: job.title,

  company: company._id,

  location:
    job.jobLocations?.[0]?.name ||
    "Not Specified",

  source: "KEKA",

  department:
    job.departmentName || "",

  externalJobId:
    String(job.id),

  description:
    job.description || "",

  experience:
    job.experience || "",

  jobType:
    String(job.jobType || ""),

  salary:
    job.salaryRangeFormat || "",

  primaryLocation:
    job.jobLocations?.[0]?.name || "",
secondaryLocations:
    job.jobLocations
        ?.slice(1)
        .map(location => location.name) || [],
  hasMultipleLocations:
    (job.jobLocations?.length || 0) > 1,

  jobUrl:
    company.careersUrl,

  postedDate:
    job.publishedOn
      ? new Date(job.publishedOn)
      : null,
}));
  };

export default collectKekaJobs;