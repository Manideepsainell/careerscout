import getKekaJobs
  from "../utils/keka.js";

const collectKekaJobs =
  async (company) => {

    console.log(
      `Keka collector running for ${company.name}`
    );

    const jobs =
      await getKekaJobs(
        company.companyId
      );

    console.log(
      `Retrieved ${jobs.length} jobs`
    );

    return jobs.map((job) => ({
      title:
        job.title,

      company:
        company._id,

      location:
        job.location ||
        "Not Specified",

      source:
        "KEKA",

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
    }));
  };

export default collectKekaJobs;