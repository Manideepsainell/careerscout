import getZohoRecruitJobs from "../utils/zohoRecruit.js";

const collectZohoRecruitJobs =
  async (company) => {
    console.log(
      `Zoho Recruit collector running for ${company.name}`
    );

    const jobs =
      await getZohoRecruitJobs(
        company.openPositionsUrl
      );

    console.log(
      `Retrieved ${jobs.length} jobs`
    );

    return jobs.map((job) => ({
      title:
        job.Posting_Title ||
        job.Job_Opening_Name,

      company:
        company._id,

      location:
        job.Country1 ||
        "India",

      source:
        "ZOHO_RECRUIT",

      externalJobId:
        String(job.id),

      jobUrl:
        job.$url,

      description:
        job.Job_Description || "",

      jobType:
        job.Job_Type ||
        "Not Specified",
    }));
  };

export default collectZohoRecruitJobs;