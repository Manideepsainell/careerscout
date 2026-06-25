import get10kCodersJobs
  from "../utils/tenkCoders.js";

const collect10kCodersJobs =
  async (company) => {

    console.log(
      `10K Coders collector running for ${company.name}`
    );

    const jobs =
      await get10kCodersJobs();

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
        "Not Specified",

      source:
        "10KCODERS",

      externalJobId:
        String(job.id),

      jobUrl:
        job.external_apply_url,

      description:
        job.description || "",

      jobType:
        job.job_type || "",

      experience:
        job.experience_level || "",

      postedDate:
  job.posted_at
    ? new Date(job.posted_at)
    : null,

    }));
  };

export default collect10kCodersJobs;