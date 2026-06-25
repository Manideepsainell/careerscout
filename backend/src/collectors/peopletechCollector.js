import getPeopleTechJobs
  from "../utils/peopletech.js";

const collectPeopleTechJobs =
  async (company) => {

    console.log(
      `PeopleTech collector running for ${company.name}`
    );

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

      externalJobId:
        String(job.id),

      jobUrl:
        "https://peopletech.com/careers",

      description:
        job.description || "",

      postedDate:
  job.createdOn
    ? new Date(job.createdOn)
    : null,
    }));
};

export default collectPeopleTechJobs;