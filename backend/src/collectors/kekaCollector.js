import getKekaJobs
  from "../utils/keka.js";

const collectKekaJobs =
  async (company) => {

    console.log(
      `Keka collector running for ${company.name}`
    );

    const jobs =
  await getKekaJobs(company);

    console.log(
      `Retrieved ${jobs.length} jobs`
    );
    console.dir(jobs[0], { depth: null });

    return jobs.map((job) => ({
      title:
        job.title,

      company:
        company._id,

      location:
  job.jobLocations?.[0]?.name ||
  "Not Specified",

      source:
        "KEKA",
        
department:
  job.departmentName || "",

      externalJobId:
        String(job.id),

      description:
        job.description || "",

      experience:
        job.experience || "",

      jobType:
        job.employmentType || "",

      jobUrl:
        company.careersUrl,
        postedDate: job.publishedOn
  ? new Date(job.publishedOn)
  : null,
    }));
  };

export default collectKekaJobs;