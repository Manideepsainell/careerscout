import getRippleHireJobs
  from "../utils/rippleHire.js";

const collectRippleHireJobs =
  async (company) => {

    console.log(
      `RippleHire collector running for ${company.name}`
    );

    const jobs =
      await getRippleHireJobs(
  company.openPositionsUrl,
  company.rippleHireToken
);

    console.log(
      `Retrieved ${jobs.length} jobs`
    );

    return jobs.map((job) => ({
      title:
        job.jobTitle,

      company:
        company._id,

      location:
        job.locations ||
        "Not Specified",

      source:
        "RIPPLEHIRE",

      externalJobId:
        String(job.jobSeq),

      jobUrl:
        `${company.careersUrl}/job/${job.jobSeq}`,

      description:
        "",

      jobType:
        "Full Time",

      postedDate:
        new Date(),
    }));
  };

export default collectRippleHireJobs;