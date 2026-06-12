import getDarwinboxJobs
  from "../utils/darwinbox.js";

const collectDarwinboxJobs =
  async (company) => {

    console.log(
      `Darwinbox collector running for ${company.name}`
    );

    const jobs =
      await getDarwinboxJobs(
        company.companyId
      );

    console.log(
      `Retrieved ${jobs.length} jobs`
    );
console.log(
  `Page ${page}: ${jobs.length} jobs`
);
    return jobs.map((job) => ({
      title:
        job.title,

      company:
        company._id,

      location:
        Array.isArray(job.locations)
          ? job.locations.join(", ")
          : job.locations ||
            "Not Specified",

      source:
        "DARWINBOX",

      externalJobId:
        String(job.id),

      description:
        job.jd || "",

      experience:
        job.experience || "",

      postedDate:
        job.posted_on
          ? new Date(job.posted_on)
          : new Date(),

      jobType:
        job.emp_type || "",
    }));
  };

export default collectDarwinboxJobs;