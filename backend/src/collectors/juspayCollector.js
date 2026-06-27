import axios from "axios";

const collectJuspayJobs = async (company) => {


  const response = await axios.get(
    company.openPositionsUrl
  );

const jobs =
  (response.data?.allJobs || [])
    .filter(job => job.opening_status === true);
 

  return jobs.map((job) => ({
    title:
      job.job_title ||
      "Untitled",

    company: company._id,

    location:
      job.job_location ||
      "Not Specified",

    source: "CUSTOM",

    externalJobId:
      String(job.job_id),

    jobUrl:
      `https://joinus.juspay.in/jobs/${job.job_id}`,

    description:
      job.job_description_career ||
      "",

    jobType:
      job.job_type ||
      "Full Time",

     postedDate:
  job.created_at
    ? new Date(job.created_at)
    : null,
  }));
};

export default collectJuspayJobs;