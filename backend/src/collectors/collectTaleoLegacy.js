import getTaleoLegacyJobs from "../utils/taleoLegacy.js";

const collectTaleoLegacy = async (company) => {
  console.log(`Taleo Legacy collector running for ${company.name}`);

  const jobs = await getTaleoLegacyJobs(company.careersUrl, company.taleoConfig);

  console.log(`Retrieved ${jobs.length} jobs`);

  return jobs.map((job) => ({
  title: job.title,
  company: company._id,
  source: "TALEO_LEGACY",
  location: "India",
  jobUrl: job.url,
  externalJobId: job.jobNumber,   // add this
}));
};

export default collectTaleoLegacy;