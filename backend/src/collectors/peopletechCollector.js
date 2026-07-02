import getPeopleTechJobs
  from "../utils/peopletech.js";

const collectPeopleTechJobs =
  async (company) => {

   

    const jobs =
      await getPeopleTechJobs(
        company.openPositionsUrl
      );

    
return jobs.map((job) => ({
  title: job.name,

  company: company._id,

  location:
    job.jobLocation ||
    "Not Specified",

  source: "PEOPLETECH",

  externalJobId: String(job.id),

  jobUrl:
    "https://peopletech.com/careers",

  description:
    job.description || "",

  department:
    job.operationId === 2
      ? "IT"
      : "",

  experience:
    String(job.experienceLevel),

  educationLevel:
    job.qualification?.name || "",

  skills:
    (job.skills || []).map(
      s => s.skill?.name
    ),

  postedDate:
    job.createdOn
      ? new Date(job.createdOn)
      : null,
}));
};

export default collectPeopleTechJobs;