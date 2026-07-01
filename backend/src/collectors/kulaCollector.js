import axios from "axios";

const collectKulaJobs = async (company) => {
  
  const response = await axios.get(
    "https://careers.kula.ai/api/internal/ats_job_posts",
    {
      params: {
        accountName: company.slug,
        page: 1,
        type: "ats_job_post.index",
        items: 99,
      },
    }
  );

  const jobs = response.data.data || [];

  
  return jobs.map((job) => ({
    title: job.title,

    company: company._id,
location:
  job.ats_job?.offices?.[0]?.location || "Not Specified",

primaryLocation:
  job.ats_job?.offices?.[0]?.location || "",

secondaryLocations:
  job.ats_job?.offices?.slice(1).map(o => o.location) || [],

hasMultipleLocations:
  (job.ats_job?.offices?.length || 0) > 1,

jobType:
  job.ats_job?.employment_type || "",

department:
  job.ats_job?.ats_department?.name || "",

workplace:
  job.ats_job?.workplace || "",

description:
  job.ats_job?.job_description || "",

    postedDate: null,
  }));
};

export default collectKulaJobs;