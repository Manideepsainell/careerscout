import getRippleHireJobs
  from "../../utils/rippleHire.js";

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
  job.jobReqExp ||
  job.mobileReqJobExp ||
  "",

      externalJobId:
        String(job.jobSeq),

      jobUrl:
        `${company.careersUrl}/job/${job.jobSeq}`,

      detailUrl:
`${company.careersUrl}/candidate/candidatejobdetail?token=${company.rippleHireToken}&jobSeq=${job.jobSeq}&source=CAREERSITE&lang=en`,

      description: "",

      jobType: "Full Time",

      postedDate:
        job.jobPostingDate
          ? new Date(job.jobPostingDate)
          : null,

    }));
  };

export default collectRippleHireJobs;