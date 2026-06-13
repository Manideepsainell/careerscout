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
        job.expiryDate
          ? new Date(
              job.expiryDate
            )
          : new Date(),

    }));
  };

export default collectInfosysJobs;