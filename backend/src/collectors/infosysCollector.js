import getInfosysJobs
  from "../utils/infosys.js";

const collectInfosysJobs =
  async (company) => {

    const jobs =
      await getInfosysJobs(
        company.openPositionsUrl
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
        minExperience:
  job.minExperienceLevel ?? null,

maxExperience:
  job.maxExperienceLevel ?? null,

      postedDate:
  job.createdOn
    ? new Date(job.createdOn)
    : null,

    }));
  };

export default collectInfosysJobs;