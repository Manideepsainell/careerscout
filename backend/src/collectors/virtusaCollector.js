import getVirtusaJobs
  from "../utils/virtusa.js";

const collectVirtusaJobs =
  async (company) => {

    const jobs =
      await getVirtusaJobs();

    console.log(
      `Retrieved ${jobs.length} jobs`
    );

    return jobs.map((job) => ({
      title:
        job.title,

      company:
        company._id,

      location:
        `${job.city || ""}${
          job.city && job.country
            ? ", "
            : ""
        }${job.country || ""}`,

      source:
        "VIRTUSA",

      externalJobId:
        job.careerCtaLink,

      jobUrl:
        `https://www.virtusa.com${job.careerCtaLink}`,

      description:
        job.descriptionExternalHTML || "",

      experience:
        job.yearsOfExperience,

      postedDate:
  job.postedDate
    ? new Date(job.postedDate)
    : null,
    }));
  };

export default collectVirtusaJobs;