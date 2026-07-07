import getMastechJobs
  from "../utils/mastech.js";

const collectMastechJobs =
  async (company) => {

    const jobs =
      await getMastechJobs(
        company.openPositionsUrl
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
        "MASTECH",

      externalJobId:
        job.url,

      jobUrl:
        job.url,

      description:
        job.description || "",

      jobType:
        "Full Time",

      postedDate: null,

    }));
  };

export default collectMastechJobs;