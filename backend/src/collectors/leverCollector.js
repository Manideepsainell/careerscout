import { getLeverJobs }
  from "../utils/lever.js";

const collectLeverJobs =
  async (company) => {

    console.log(
      `Lever collector running for ${company.name}`
    );

    const jobs =
      await getLeverJobs(
        company.name.toLowerCase()
      );

    console.log(
      `Retrieved ${jobs.length} jobs`
    );

    return jobs.map((job) => ({
      title: job.text,

      company: company._id,

      location:
        job.categories?.location ||
        "Not Specified",

      source: "LEVER",

      externalJobId: job.id,

      jobUrl:
        job.hostedUrl || "",

      description: `
${job.descriptionPlain || ""}

${job.lists
  ?.map((list) => list.content)
  .join("\n\n") || ""}
`,

      jobType:
        job.categories?.commitment ||
        "Full Time",

      postedDate:
        new Date(job.createdAt),
    }));
  };

export default collectLeverJobs;