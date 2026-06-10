import getSuccessFactorsJobs
  from "../utils/successFactors.js";

const collectSuccessFactorsJobs =
  async (company) => {
    console.log("COMPANY");
console.log(company);

    console.log(
      `SuccessFactors collector running for ${company.name}`
    );

    const jobs =
      await getSuccessFactorsJobs(
        company.openPositionsUrl,
        9553955
      );

    console.log(
      `Retrieved ${jobs.length} jobs`
    );

    return jobs.map((job) => {

      const data = job.response;

      return {
        title:
          data?.unifiedStandardTitle,

        company: company._id,

        location:
          data?.custprimecity ||
          data?.custCountryRegion?.[0] ||
          "India",

        source: "SUCCESSFACTORS",

        externalJobId:
          String(data?.id),

        jobUrl:
          `https://careers.hcltech.com/job/${data?.urlTitle}/${data?.id}-en_US`,

        description: "",

        jobType: "Full Time",

        postedDate:
          data?.unifiedStandardStart
            ? new Date(
                data.unifiedStandardStart
              )
            : new Date(),
      };
    });
  };

export default collectSuccessFactorsJobs;