import Company from "../models/Company.js";
import Job from "../models/Job.js";
import dotenv from "dotenv";

dotenv.config();

// imports ...
import CrawlStat from "../models/CrawlStat.js";
import RunStat from "../models/RunStat.js";
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
import collectAshbyJobs from "../collectors/ashbyCollector.js";
import collectKulaJobs from "../collectors/kulaCollector.js";
import collectFreshteamJobs from "../collectors/freshteamCollector.js";
import collectTrakstarJobs from "../collectors/trakstarCollector.js";

const collectors = {
  WORKDAY: collectWorkdayJobs,
  GREENHOUSE: collectGreenhouseJobs,
  SMARTRECRUITERS: collectSmartRecruitersJobs,
  ORACLE: collectOracleJobs,
  EIGHTFOLD: collectEightfoldJobs,
  SUCCESSFACTORS: collectSuccessFactorsJobs,
  RIPPLEHIRE: collectRippleHireJobs,
  ZWAYAM: collectZwayamJobs,
  TALEO: collectTaleoJobs,
  CORNERSTONE: collectCornerstoneJobs,
  TOPGRADING: collectTopGradingJobs,
  ZOHO_RECRUIT: collectZohoRecruitJobs,
  KEKA: collectKekaJobs,
  DARWINBOX: collectDarwinboxJobs,
  PEOPLETECH: collectPeopleTechJobs,
  TECHOLUTION: collectTecholutionJobs,
  EPAM: collectEpamJobs,
  VIRTUSA: collectVirtusaJobs,
  ACCENTURE: collectAccentureJobs,
  INFOSYS: collectInfosysJobs,
  ASHBY: collectAshbyJobs,
  FRESHTEAM: collectFreshteamJobs,
  TRAKSTAR: collectTrakstarJobs,
  CAPGEMINI: collectCapgeminiJobs,
  IBM: collectIbmJobs,
  MASTECH: collectMastechJobs,
  KULA: collectKulaJobs,
  "10KCODERS": collect10kCodersJobs,

  CUSTOM: async (company) => {
    if (company.name === "Atlassian") {
      return collectAtlassianJobs(company);
    }

    if (company.name === "Juspay") {
      return collectJuspayJobs(company);
    }

    return [];
  },

  LEVER: collectLeverJobs,
};

async function processCompany(company) {

  const crawlStat =
    await CrawlStat.create({
      source: company.jobBoardType,
      company: company.name,
      startedAt: new Date(),
      status: "RUNNING",
    });

  const collector =
    collectors[company.jobBoardType];

  console.log(
    "JOB BOARD TYPE:",
    company.jobBoardType
  );

  if (!collector) {

    console.log(
      `No collector configured for ${company.name}`
    );

    await CrawlStat.findByIdAndUpdate(
      crawlStat._id,
      {
        completedAt: new Date(),
        status: "FAILED",
      }
    );

    return {
      success: false,
      jobsAdded: 0,
    };
  }

  let jobs = [];

  try {

    jobs =
      await collector(company);

  } catch (error) {

    console.log(
      `Collector failed for ${company.name}`
    );

    console.log(
      error.message
    );

    await CrawlStat.findByIdAndUpdate(
      crawlStat._id,
      {
        completedAt: new Date(),
        status: "FAILED",
      }
    );

    return {
      success: false,
      jobsAdded: 0,
    };
  }

  const jobsToInsert = [];

  for (const job of jobs) {

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

let jobsAdded = 0;

try {

  if (jobsToInsert.length > 0) {

    const operations =
      jobsToInsert.map((job) => ({
        updateOne: {

          filter: {
            company: job.company,
            externalJobId:
              job.externalJobId,
          },

          update: {

            $set: {

              title:
                job.title,

              location:
                job.location,

              jobType:
                job.jobType,

              experience:
                job.experience,

              salary:
                job.salary,

              source:
                job.source,

              jobUrl:
                job.jobUrl,

              description:
                job.description,

              score:
                job.score,

              roleCategory:
                job.roleCategory,

              eligibilityLevel:
                job.eligibilityLevel,

              experienceBand:
                job.experienceBand,

              status:
                "ACTIVE",

              postedDate:
                job.postedDate,

              lastSeenAt:
                new Date(),
            },

            $setOnInsert: {
              createdAt:
                new Date(),
            },
          },

          upsert: true,
        },
      }));

    const result =
      await Job.bulkWrite(
        operations
      );

    jobsAdded =
      result.upsertedCount;
  }

} catch (error) {

  console.log(
    `Insert failed for ${company.name}`
  );

  console.log(
    error.message
  );

  await CrawlStat.findByIdAndUpdate(
    crawlStat._id,
    {
      completedAt: new Date(),
      status: "FAILED",
    }
  );

  return {
    success: false,
    jobsAdded: 0,
  };
}

  await CrawlStat.findByIdAndUpdate(
    crawlStat._id,
    {
      completedAt: new Date(),
      jobsAdded,
      status: "SUCCESS",
    }
  );

  console.log(
    `${jobsAdded} new jobs stored`
  );

  console.log(
    `${company.name}: ${jobs.length} jobs`
  );

  return {
    success: true,
    jobsAdded,
  };
}
const runDiscovery = async () => {

  console.log(
    "Discovery Runner Started"
  );

  const filter =
    process.argv[2] ||
    process.env.FILTER;

  let query = {};

  if (filter) {

    const company =
      await Company.findOne({
        name: filter,
      });

    query =
      company
        ? { name: filter }
        : { jobBoardType: filter };
  }

  const companies =
    await Company.find(query);

  const runStat =
    await RunStat.create({
      source:
        filter || "ALL",

      startedAt:
        new Date(),

      status:
        "RUNNING",
    });

  console.log(
    `Loaded ${companies.length} companies`
  );

  let totalJobsAdded = 0;

  let totalCompaniesProcessed = 0;

  let totalCompaniesFailed = 0;

  const batchSize = 1;

  for (
    let i = 0;
    i < companies.length;
    i += batchSize
  ) {

    const batch =
      companies.slice(
        i,
        i + batchSize
      );

    const results =
      await Promise.all(
        batch.map(processCompany)
      );

    for (const result of results) {

      totalCompaniesProcessed++;

      totalJobsAdded +=
        result.jobsAdded;

      if (!result.success) {

        totalCompaniesFailed++;

      }
    }
  }

  await RunStat.findByIdAndUpdate(
    runStat._id,
    {
      completedAt:
        new Date(),

      companiesProcessed:
        totalCompaniesProcessed,

      companiesFailed:
        totalCompaniesFailed,

      jobsAdded:
        totalJobsAdded,

      status:
        "SUCCESS",
    }
  );

  console.log(
    "Discovery completed"
  );

  console.log(
    `${totalJobsAdded} jobs added`
  );

  console.log(
    `${totalCompaniesFailed} companies failed`
  );
};
export default runDiscovery;
