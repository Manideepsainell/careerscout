import getIbmJobs
  from "../utils/ibm.js";

const collectIbmJobs =
  async (company) => {

    const jobs =
      await getIbmJobs(
        company.openPositionsUrl
      );

    console.log(
      `Retrieved ${jobs.length} jobs`
    );
    console.log(
  JSON.stringify(
    jobs[0],
    null,
    2
  )
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

        location:
          data.field_keyword_17 ||
          "Not Specified",

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

        postedDate:
          new Date(),
          
      };
    });
  };

export default collectIbmJobs;