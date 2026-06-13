import Company from "../models/Company.js";
import Job from "../models/Job.js";
import dotenv from "dotenv";

dotenv.config();
import collectCornerstoneJobs from "../collectors/cornerstoneCollector.js";
import collectWorkdayJobs from "../collectors/workdayCollector.js";
import collectGreenhouseJobs from "../collectors/greenhouseCollector.js";
import collectSmartRecruitersJobs from "../collectors/smartRecruitersCollector.js";
import collectOracleJobs from "../collectors/oracleCollector.js";
import collectEightfoldJobs from "../collectors/eightfoldCollector.js";
import collectAtlassianJobs from "../collectors/atlassianCollector.js";
import collectRippleHireJobs
  from "../collectors/rippleHireCollector.js";
import collectLeverJobs
  from "../collectors/leverCollector.js";
  import collectJuspayJobs
  from "../collectors/juspayCollector.js";
  import collectSuccessFactorsJobs
  from "../collectors/successFactorsCollector.js";
import collectTaleoJobs
  from "../collectors/taleoCollector.js";
import collectTopGradingJobs from "../collectors/topgradingCollector.js";
import collectKekaJobs from "../collectors/kekaCollector.js";
import collectZohoRecruitJobs
  from "../collectors/zohoRecruitCollector.js";
import collectDarwinboxJobs from "../collectors/darwinboxCollector.js";
import collectPeopleTechJobs from "../collectors/peopletechCollector.js";
import categorizeRole from "../utils/jobCategorizer.js";
import getEligibilityLevel from "../utils/eligibilityTagger.js";
import collectZwayamJobs
  from "../collectors/zwayamCollector.js";
import collectTecholutionJobs from "../collectors/techolutionCollector.js";
import collectEpamJobs from "../collectors/epamCollector.js";
import collectVirtusaJobs from "../collectors/virtusaCollector.js";
import collectAccentureJobs
  from "../collectors/accentureCollector.js";
import collectInfosysJobs from "../collectors/infosysCollector.js";
import collectCapgeminiJobs
  from "../collectors/capgeminiCollector.js";
import collectIbmJobs from "../collectors/ibmCollector.js";
import collectMastechJobs
  from "../collectors/mastechCollector.js";
import collect10kCodersJobs from "../collectors/tenkCollector.js";

const collectors = {
  WORKDAY: collectWorkdayJobs,
  GREENHOUSE: collectGreenhouseJobs,
  SMARTRECRUITERS: collectSmartRecruitersJobs,
  ORACLE: collectOracleJobs,
  EIGHTFOLD: collectEightfoldJobs,
    SUCCESSFACTORS: collectSuccessFactorsJobs,
     RIPPLEHIRE: collectRippleHireJobs,
     ZWAYAM:collectZwayamJobs,
     TALEO:collectTaleoJobs,
     CORNERSTONE:collectCornerstoneJobs,
     TOPGRADING:collectTopGradingJobs,
     ZOHO_RECRUIT:collectZohoRecruitJobs,
     KEKA:collectKekaJobs,
     DARWINBOX:collectDarwinboxJobs,
     PEOPLETECH:collectPeopleTechJobs,
     TECHOLUTION:collectTecholutionJobs,
     EPAM:collectEpamJobs,
     VIRTUSA:collectVirtusaJobs,
     ACCENTURE: collectAccentureJobs,
     INFOSYS:collectInfosysJobs,
     CAPGEMINI:
  collectCapgeminiJobs,
  IBM:collectIbmJobs,
  MASTECH:collectMastechJobs,
  "10KCODERS": collect10kCodersJobs,
 CUSTOM: async (company) => {
  if (company.name === "Atlassian") {
    return collectAtlassianJobs(
      company
    );
  }

  if (company.name === "Juspay") {
  return collectJuspayJobs(company);
}

  return [];
},
  LEVER: collectLeverJobs,
};

const runDiscovery = async () => {
  console.log("Discovery Runner Started");
const companyName =
  process.argv[2] ||
  process.env.COMPANY;

console.log(
  "Running company:",
  companyName
);

const companies = await Company.find({
  name: companyName,
});

  console.log(`Loaded ${companies.length} companies`);

  for (const company of companies) {
    const collector = collectors[company.jobBoardType];
    console.log(
  "JOB BOARD TYPE:",
  company.jobBoardType
);
    if (!collector) {
      console.log(
        `No collector configured for ${company.name}`
      );
      continue;
    }

    const jobs = await collector(company);

   const existingJobs = await Job.find({
  company: company._id,
}).select("externalJobId");

const existingIds = new Set(
  existingJobs.map(job =>
    String(job.externalJobId)
  )
);

const jobsToInsert = [];

for (const job of jobs) {
  if (
    existingIds.has(
      String(job.externalJobId)
    )
  ) {
    continue;
  }

  if (!job.title) {
    console.log(
      `Skipping invalid job from ${company.name}`
    );
    continue;
  }

  job.roleCategory =
    categorizeRole(job.title);

  job.eligibilityLevel =
    getEligibilityLevel(job.title);

  jobsToInsert.push(job);
}

if (jobsToInsert.length > 0) {
  await Job.insertMany(
    jobsToInsert,
    {
      ordered: false,
    }
  );
}

const newJobsCount =
  jobsToInsert.length;

console.log(
  `${newJobsCount} new jobs stored`
);
    console.log(`${company.name}: ${jobs.length} jobs`);
  }
};

export default runDiscovery;