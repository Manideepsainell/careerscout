import axios from "axios";

const collectKulaJobs = async (company) => {
  console.log(
    `Kula collector running for ${company.name}`
  );

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

  console.log(
    `${jobs.length} jobs found`
  );

  return jobs.map((job) => ({
    title: job.title,

    company: company._id,

    location:
      job.offices?.[0]?.location ||
      "Not Specified",

    source: "KULA",

    externalJobId: String(job.id),

    jobUrl: `https://careers.kula.ai/${company.slug}`,

    description:
      job.ats_job?.job_description || "",

    postedDate: null,
  }));
};

export default collectKulaJobs;