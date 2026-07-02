import getCapgeminiJobs
  from "../utils/capgemini.js";

const collectCapgeminiJobs =
  async (company) => {

    const jobs =
      await getCapgeminiJobs(
        company.openPositionsUrl
      );

   
return jobs.map((job) => ({
  title: job.title,

  company: company._id,

  location:
    job.location ||
    "India",

  source: "CAPGEMINI",

  externalJobId: String(job.id),

  jobUrl:
    job.apply_job_url ||
    company.careersUrl,

  description:
    job.description || "",

  jobType:
    job.contract_type ||
    "Full Time",

  postedDate: job.updated_at
    ? new Date(job.updated_at)
    : null,

  // ---------- Intelligence ----------

  department:
    job.professional_communities ||
    job.department ||
    "",

  team:
    job.sbu ||
    "",

  experience:
    job.experience_level ||
    "",

  educationLevel:
    job.education_level ||
    "",
}));
  };

export default collectCapgeminiJobs;