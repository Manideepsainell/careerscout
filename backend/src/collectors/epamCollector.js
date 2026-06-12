import getEpamJobs
  from "../utils/epam.js";

const collectEpamJobs =
  async (company) => {

    console.log(
      `EPAM collector running for ${company.name}`
    );

    const jobs =
      await getEpamJobs();

    console.log(
      `Retrieved ${jobs.length} jobs`
    );
console.log(
  JSON.stringify(
    jobs[0],
    null,
    2
  )
);
    return jobs.map((job) => ({
      title:
        job.name,

      company:
        company._id,

      location:
        `${job.city || ""}${
          job.city && job.country
            ? ", "
            : ""
        }${job.country || ""}` ||
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
          : new Date(),
    }));
  };

export default collectEpamJobs;