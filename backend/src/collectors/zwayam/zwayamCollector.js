import getZwayamJobs
  from "../../utils/zwayam.js";

const collectZwayamJobs =
  async (company) => {

  

    const jobs =
      await getZwayamJobs(
        company.openPositionsUrl,
        company.companyId,
        company.domain
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
    : null,
      };
    });
  };

export default collectZwayamJobs;