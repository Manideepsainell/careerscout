import getEpamJobs
  from "../utils/epam.js";

const collectEpamJobs =
  async (company) => {

    

    const jobs =
      await getEpamJobs();

    

    return jobs.map((job) => ({
      title:
        job.name,

      company:
        company._id,

      location:
  [job.city, job.country]
    .filter(Boolean)
    .join(", ") ||
  "Not Specified",

      source:
        "EPAM",

      externalJobId:
        String(
          job.unique_id ||
          job.uid
        ),

      jobUrl:
        `https://careers.epam.com/en/vacancy/${job.uid}`,

      description:
        job.description || "",

      jobType:
        job.posting_type,

     postedDate:
  job.date
    ? new Date(job.date)
    : null,
    }));
  };

export default collectEpamJobs;