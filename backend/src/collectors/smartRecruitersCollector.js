import axios from "axios";

const collectSmartRecruitersJobs = async (
  company
) => {
  

let companyId = company.companyId;

if (!companyId && company.openPositionsUrl) {
  companyId = new URL(company.openPositionsUrl)
    .pathname
    .split("/")
    .filter(Boolean)
    .pop();
}

if (!companyId) {
  throw new Error(
    `${company.name}: missing SmartRecruiters company ID`
  );
}

const endpoint =
  `https://api.smartrecruiters.com/v1/companies/${companyId}/postings`;



  const response = await axios.get(
    endpoint
  );

  const jobs =
    response.data.content || [];


  return jobs.map((job) => ({
    title: job.name,

    company: company._id,

    location:
      job.location?.fullLocation ||
      "Not Specified",

    jobType:
      job.typeOfEmployment?.label ||
      "",

    experience:
      job.experienceLevel?.label ||
      "",

    externalJobId:
      String(job.id),

    source:
      "SMARTRECRUITERS",
      department:
  job.department?.label || "",

team:
  job.function?.label || "",

workplace:
  job.location?.remote
    ? "REMOTE"
    : job.location?.hybrid
      ? "HYBRID"
      : "ONSITE",

    jobUrl:
      `${company.openPositionsUrl.replace(/\/$/, "")}/${job.id}`,
      postedDate: job.releasedDate
  ? new Date(job.releasedDate)
  : null,
  }));
};

export default collectSmartRecruitersJobs;