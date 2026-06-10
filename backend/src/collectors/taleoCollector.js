import getTaleoJobs
  from "../utils/taleo.js";

const collectTaleoJobs =
  async (company) => {

    console.log(
      `Taleo collector running for ${company.name}`
    );

    const jobs =
      await getTaleoJobs(
        company.careersUrl
      );

    console.log(
      `Retrieved ${jobs.length} jobs`
    );

    return jobs.map((job) => ({
      title: job.title,
      company: company._id,
      source: "TALEO",
      location: "India",
      jobUrl: job.url,
    }));
  };

export default collectTaleoJobs;