import getEpamJobs
  from "../utils/epam.js";

const collectEpamJobs =
  async (company) => {

    

    const jobs =
      await getEpamJobs();


   return jobs.map((job) => ({
  title: job.name,

  company: company._id,

  location:
    (job.city || [])
      .map(c => c.name)
      .join(", ") ||
    "Not Specified",

  source: "EPAM",

  externalJobId: String(
    job.unique_id || job.uid
  ),

  jobUrl:
    `https://careers.epam.com${job.seo?.url}`,

  description:
    job.description || "",

  jobType:
    job.posting_type || "Full Time",

  department:
    job.job_specialization?.[0] ||
    "",

  experience:
    job.seniority || "",

  team:
    job.primary_skill || "",

  workplace:
    job.vacancy_type || "",

  postedDate:
    job.created_at
      ? new Date(job.created_at)
      : null,
}));
  };

export default collectEpamJobs;