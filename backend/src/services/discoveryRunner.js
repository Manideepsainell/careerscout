import Company from "../models/Company.js";
import Job from "../models/Job.js";

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
import categorizeRole from "../utils/jobCategorizer.js";
import getEligibilityLevel from "../utils/eligibilityTagger.js";
const collectors = {
  WORKDAY: collectWorkdayJobs,
  GREENHOUSE: collectGreenhouseJobs,
  SMARTRECRUITERS: collectSmartRecruitersJobs,
  ORACLE: collectOracleJobs,
  EIGHTFOLD: collectEightfoldJobs,
    SUCCESSFACTORS: collectSuccessFactorsJobs,
     RIPPLEHIRE: collectRippleHireJobs,
 CUSTOM: async (company) => {
  if (company.name === "Atlassian") {
    return collectAtlassianJobs(
      company
    );
  }

  if (company.name === "Juspay") {
    return collectJuspayJobs(
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
const companies = await Company.find({
  active: true
});
  console.log(`Loaded ${companies.length} companies`);

  for (const company of companies) {
    const collector = collectors[company.jobBoardType];

    if (!collector) {
      console.log(
        `No collector configured for ${company.name}`
      );
      continue;
    }

    const jobs = await collector(company);

    let newJobsCount = 0;

    for (const job of jobs) {
      const existingJob = await Job.findOne({
        company: job.company,
        externalJobId: job.externalJobId,
      });

      if (existingJob) {
        continue;
      }

      if (!job.title) {
        console.log(
          `Skipping invalid job from ${company.name}`
        );
        continue;
      }

      job.roleCategory = categorizeRole(job.title);
      job.eligibilityLevel = getEligibilityLevel(job.title);

      await Job.create(job);

      newJobsCount++;
    }

    console.log(`${newJobsCount} new jobs stored`);
    console.log(`${company.name}: ${jobs.length} jobs`);
  }
};

export default runDiscovery;