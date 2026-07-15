import { searchJobs }
  from "../utils/cornerstone.js";

const collectCornerstoneJobs =
  async (company) => {

    
    let allJobs = [];
    let pageNumber = 1;

    while (true) {

    const data = await searchJobs({
  apiUrl: company.cornerstoneApiUrl,
  careerSiteId: company.careerSiteId,
  careerSitePageId: company.careerSitePageId,
  pageNumber,
});

      const jobs =
        data.requisitions || [];

      if (jobs.length === 0) {
        break;
      }

      allJobs.push(...jobs);

      

      const totalCount =
        data.totalCount || 0;

      if (
        allJobs.length >= totalCount
      ) {
        break;
      }

      pageNumber++;
    }

return allJobs.map((job) => ({

  title:
    job.displayJobTitle,

  company:
    company._id,

  location:
    job.locations
      ?.map(
        (loc) =>
          loc.city ||
          loc.locationName
      )
      .filter(Boolean)
      .join(", ") ||
    "Not Specified",

  source:
    "CORNERSTONE",

  externalJobId:
    String(job.requisitionId),

  jobUrl:
    company.careersUrl,

  description:
    job.externalDescription || "",

  jobType:
    "Full Time",

  department:
    job.jobCategory || "",

  workplace:
    job.externalDescription?.includes("#LI-Onsite")
      ? "ONSITE"
      : job.externalDescription?.toLowerCase().includes("hybrid")
        ? "HYBRID"
        : "",

  postedDate:
    job.postingEffectiveDate
      ? new Date(job.postingEffectiveDate)
      : null,
}));
  };

export default collectCornerstoneJobs;