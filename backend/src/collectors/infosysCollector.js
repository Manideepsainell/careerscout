import getInfosysJobs
  from "../utils/infosys.js";

const collectInfosysJobs =
  async (company) => {

    const jobs =
      await getInfosysJobs(
        company.openPositionsUrl
      );

    console.log(
      `Retrieved ${jobs.length} jobs`
    );
console.log(
  "FIRST INFOSYS JOB:"
);


    return jobs.map((job) => ({

      title:
        job.postingTitle,

      company:
        company._id,

      location:
        job.location ||
        "India",

      source:
        "INFOSYS",

      externalJobId:
        String(
          job.requisitionId ||
          job.postingId ||
          job.publicationId
        ),

      jobUrl:
        company.careersUrl,

      description:
        job.rolesResponsibilities ||
        "",

      jobType:
        "Full Time",

      postedDate:
  job.createdOn
    ? new Date(job.createdOn)
    : null,

    }));
  };

export default collectInfosysJobs;