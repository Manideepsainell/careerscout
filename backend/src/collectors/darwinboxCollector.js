import getDarwinboxJobs from "../utils/darwinbox.js";

const collectDarwinboxJobs = async (company) => {
  const jobs = await getDarwinboxJobs(
    company.openPositionsUrl
  );

  return jobs.map((job) => ({
    title: job.title,

    company: company._id,

    location:
      job.officelocations_without_area?.[0] ||
      job.locations ||
      "Not Specified",

    source: "DARWINBOX",

    externalJobId: String(job.id),

    description: job.jd || "",

    experience: job.experience || "",

    postedDate: job.posted_on
      ? new Date(job.posted_on)
      : null,

    jobType:
      job.emp_type_name ||
      job.emp_type ||
      "",

    department:
      job.department_name_only ||
      job.department_name ||
      "",

    workplace: job.is_remote
      ? "REMOTE"
      : "ONSITE",
  }));
};

export default collectDarwinboxJobs;