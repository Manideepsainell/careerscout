import getRippleHireJobs
  from "../utils/rippleHire.js";

const collectRippleHireJobs =
  async (company) => {

    
    const jobs =
      await getRippleHireJobs(
  company.openPositionsUrl,
  company.rippleHireToken
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
      experience:
  job.jobMinExp != null && job.jobMaxExp != null
    ? `${job.jobMinExp}-${job.jobMaxExp} Years`
    : job.jobMinExp != null
      ? `${job.jobMinExp}+ Years`
      : job.jobMaxExp != null
        ? `Up to ${job.jobMaxExp} Years`
        : "",

      externalJobId:
        String(job.jobSeq),

      jobUrl:
        `${company.careersUrl}/job/${job.jobSeq}`,

      description:
        "",

      jobType:
        "Full Time",

   postedDate: null,
    }));
  };

export default collectRippleHireJobs;