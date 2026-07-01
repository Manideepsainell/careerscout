import getZohoRecruitJobs from "../../utils/zohoRecruit.js";

const collectZohoRecruitJobs =
  async (company) => {
   

    const jobs =
      await getZohoRecruitJobs(
        company.openPositionsUrl
      );



   return jobs.map((job) => ({
  title:
    job.Posting_Title,

  company:
    company._id,

  location:
    [
      job.City,
      job.State,
      job.Country,
    ]
      .filter(Boolean)
      .join(", ") ||
    "Not Specified",

  source:
    "ZOHO_RECRUIT",

  externalJobId:
    job.id,

  jobUrl:
    job.$url,

  description:
    job.Job_Description || "",

  jobType:
    job.Job_Type || "",

  postedDate:
    job.Date_Opened
      ? new Date(job.Date_Opened)
      : null,
}));
  };

export default collectZohoRecruitJobs;