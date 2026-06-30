import { getLeverJobs }
  from "../utils/lever.js";

const collectLeverJobs =
  async (company) => {

    let slug = company.slug;

    if (
      !slug &&
      company.openPositionsUrl
    ) {
      slug = new URL(
        company.openPositionsUrl
      )
        .pathname
        .split("/")
        .filter(Boolean)
        .pop();
    }

    if (!slug) {
      throw new Error(
        `${company.name}: missing Lever slug`
      );
    }

    const jobs =
      await getLeverJobs(slug);

    return jobs.map((job) => ({

      title: job.text,

      company: company._id,

      location:
        job.categories?.location ||
        "Not Specified",
        

      source: "LEVER",

      externalJobId:
        job.id,

      jobUrl:
        job.hostedUrl || "",

      description: [
        job.descriptionPlain,
        ...(job.lists || [])
          .map(list => list.content)
      ]
        .filter(Boolean)
        .join("\n\n"),

      department:
        job.categories?.department || "",

      team:
        job.categories?.team || "",

      workplace:
        job.workplaceType || "",

      jobType:
        job.categories?.commitment ||
        "",

      primaryLocation:
        job.categories?.location || "",

      secondaryLocations:
        job.additionalLocations || [],

      hasMultipleLocations:
        (job.additionalLocations?.length || 0) > 0,

      postedDate:
        job.createdAt
          ? new Date(job.createdAt)
          : null,

    }));
 
  };

export default collectLeverJobs;