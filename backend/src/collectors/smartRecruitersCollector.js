import axios from "axios";

const collectSmartRecruitersJobs = async (
  company
) => {
  console.log(
    `Smart Recruiter collector running for ${company.name}`
  );

  const endpoint =
    `https://api.smartrecruiters.com/v1/companies/${company.companyId}/postings`;

  console.log(endpoint);

  const response = await axios.get(
    endpoint
  );

  const jobs =
    response.data.content || [];

  console.log(
    `Retrieved ${jobs.length} jobs`
  );

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

    jobUrl:
      job.ref,
      postedDate: null,
  }));
};

export default collectSmartRecruitersJobs;