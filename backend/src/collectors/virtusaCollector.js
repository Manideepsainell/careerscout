import getVirtusaJobs
  from "../utils/virtusa.js";

const collectVirtusaJobs =
  async (company) => {

    const jobs =
      await getVirtusaJobs();

    
   return jobs.map((job) => ({

  title: job.title,

  company: company._id,

  location:
    [
      job.city,
      job.state,
      job.country,
    ]
      .filter(Boolean)
      .join(", ") ||
    "Not Specified",

  source: "VIRTUSA",

  externalJobId:
    String(
      job.contestNumber ||
      job.careerCtaLink
    ),

  jobUrl:
    `https://www.virtusa.com${job.careerCtaLink}`,

  description:
    job.descriptionExternalHTML || "",

  jobType:
    job.employeeStatus ||
    job.jobSchedule ||
    "Full Time",

  experience:
    job.yearsOfExperience,

  department:
    job.category || "",

  team:
    job.jobField || "",

  postedDate:
    job.postedDate
      ? new Date(job.postedDate)
      : null,
}));
  };

export default collectVirtusaJobs;