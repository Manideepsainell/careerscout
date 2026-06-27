import getTaleoJobs
  from "../utils/taleo.js";

const collectTaleoJobs =
  async (company) => {

    

    const jobs =
      await getTaleoJobs(
        company.careersUrl
      );


    return jobs.map((job) => ({
      title: job.title,
      company: company._id,
      source: "TALEO",
      location: "India",
      jobUrl: job.url,
      postedDate: null,
    }));
  };

export default collectTaleoJobs;