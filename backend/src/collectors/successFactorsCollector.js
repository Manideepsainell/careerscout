import getSuccessFactorsJobs
  from "../utils/successFactors.js";

const collectSuccessFactorsJobs =
  async (company) => {


   
    const baseUrl = new URL(
  company.openPositionsUrl
).origin;

   const jobs =
  await getSuccessFactorsJobs(
    company.openPositionsUrl,
    company.categoryId ?? 0,
    company.locationFilter || ""
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
  `${baseUrl}/job/${data?.urlTitle}/${data?.id}-en_US`,

        description: "",

        jobType: "Full Time",

       postedDate:
  data?.unifiedStandardStart
    ? new Date(
        data.unifiedStandardStart
      )
    : null,
      };
    });
  };

export default collectSuccessFactorsJobs;