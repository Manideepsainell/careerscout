import getZwayamJobs
  from "../utils/zwayam.js";

const collectZwayamJobs =
  async (company) => {

    console.log(
      `Zwayam collector running for ${company.name}`
    );

    const jobs =
      await getZwayamJobs(
        company.openPositionsUrl,
        company.companyId,
        company.domain
      );

    console.log(
      `Retrieved ${jobs.length} jobs`
    );

    return jobs.map((job) => {

      const data =
        job._source || {};

      return {
        title:
          data.jobTitle,

        company:
          company._id,

        location:
          data.location ||
          data.text1 ||
          "India",

        source:
          "ZWAYAM",

        externalJobId:
          String(
            data.id
          ),

        jobUrl:
          `https://${company.domain}/job/${data.jobUrl}`,

        description:
          data.shortDescription ||
          "",

        jobType:
          data.jobType === "J"
            ? "Full Time"
            : "Other",

        postedDate:
          data.createdDate
            ? new Date(
                data.createdDate
              )
            : new Date(),
      };
    });
  };

export default collectZwayamJobs;