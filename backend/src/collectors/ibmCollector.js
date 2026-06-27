import getIbmJobs
  from "../utils/ibm.js";

const collectIbmJobs =
  async (company) => {

    const jobs =
      await getIbmJobs(
        company.openPositionsUrl
      );

  

    return jobs.map((job) => {

      const data =
        job._source || {};

      const jobId =
        data.url?.match(
          /jobId=(\d+)/
        )?.[1];

      return {

        title:
          data.title,

        company:
          company._id,
location: data.field_keyword_19 || "Not Specified",
workMode: data.field_keyword_17 || null,
department: data.field_keyword_08 || null,
experienceLevel: data.field_keyword_18 || null,
postedDate: data.dcdate
  ? new Date(data.dcdate)
  : null,

        source:
          "IBM",

        externalJobId:
          String(
            jobId ||
            data.url
          ),

        jobUrl:
          data.url,

        description:
          data.description ||
          "",

        jobType:
          "Full Time",

          
      };
    });
  };

export default collectIbmJobs;