import Company from "../models/Company.js";
import Job from "../models/Job.js";
import dotenv from "dotenv";

dotenv.config();
import withTimeout
  from "../utils/withTimeout.js";
  import enrichCollectorDetails
  from "../collectors/shared/enrichCollectorDetails.js";
// imports ...
import CrawlStat from "../models/CrawlStat.js";
import RunStat from "../models/RunStat.js";
import collectCornerstoneJobs from "../collectors/cornerstoneCollector.js";
import collectWorkdayJobs from "../collectors/workday/workdayCollector.js";
import collectGreenhouseJobs from "../collectors/greenhouseCollector.js";
import collectSmartRecruitersJobs from "../collectors/smartRecruitersCollector.js";
import collectOracleJobs from "../collectors/oracle/oracleCollector.js";
import collectEightfoldJobs from "../collectors/eightfold/eightfoldCollector.js";
import collectAtlassianJobs from "../collectors/atlassianCollector.js";
import collectRippleHireJobs
  from "../collectors/rippleHire/ripplehireCollector.js";
import collectLeverJobs
  from "../collectors/leverCollector.js";
  import collectJuspayJobs
  from "../collectors/juspayCollector.js";
  import collectSuccessFactorsJobs
  from "../collectors/successFactorsCollector.js";
import collectTaleoJobs from "../collectors/taleoCollector.js";
import collectTopGradingJobs from "../collectors/topgradingCollector.js";
import collectKekaJobs from "../collectors/kekaCollector.js";
import collectZohoRecruitJobs
  from "../collectors/zoho/zohoRecruitCollector.js";
import collectDarwinboxJobs from "../collectors/darwinboxCollector.js";
import collectTaleoLegacy from "../collectors/collectTaleoLegacy.js"
import collectPeopleTechJobs from "../collectors/peopletechCollector.js";
import categorizeRole from "../intelligence/jobCategorizer.js";
import getEligibilityLevel from "../intelligence/eligibilityTagger.js";
import enrichJob
  from "../intelligence/enrichJob.js";
import collectZwayamJobs
  from "../collectors/zwayam/zwayamCollector.js";
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
import collectAshbyJobs from "../collectors/ashby/ashbyCollector.js";
import collectKulaJobs from "../collectors/kulaCollector.js";
import collectFreshteamJobs from "../collectors/freshteamCollector.js";
import collectTrakstarJobs from "../collectors/trakstarCollector.js";
import collectSuccessFactorsCSBJobs from "../collectors/successFactorsCSBCollector.js";
import buildJobUpdate from "../utils/buildJobUpdate.js";
const collectors = {
  WORKDAY: collectWorkdayJobs,
  GREENHOUSE: collectGreenhouseJobs,
  SMARTRECRUITERS: collectSmartRecruitersJobs,
  ORACLE: collectOracleJobs,
  EIGHTFOLD: collectEightfoldJobs,
  SUCCESSFACTORS: collectSuccessFactorsJobs,
  RIPPLEHIRE: collectRippleHireJobs,
  ZWAYAM: collectZwayamJobs,
TALEOLEGACY:collectTaleoLegacy,
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
  TALEO:collectTaleoJobs,
  SUCCESSFACTORS_CSB:collectSuccessFactorsCSBJobs,
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

 export async function processCompany(company) {
if (!company.jobBoardType) {

  console.log(
    `${company.name}: missing jobBoardType`
  );

 return {
  success: false,
  company: company.name,
  collector: null,
  jobsFetched: 0,
  jobsAdded: 0,
};
}

if (
  !company.openPositionsUrl &&
  !company.careersUrl &&
  !company.companyId &&
  !company.slug
) {
  console.log(
    `${company.name}: missing collector configuration`
  );

 return {
  success: false,
  company: company.name,
  collector: company.jobBoardType,
  jobsFetched: 0,
  jobsAdded: 0,
};

}
  console.log(
    `\n========== START ${company.name} ==========`
  );

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
    `Collector: ${company.jobBoardType}`
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
  company: company.name,
  collector: company.jobBoardType,
  jobsFetched: 0,
  jobsAdded: 0,
};

  }

  let jobs = [];

 const start = Date.now();

try {

  jobs =
    await withTimeout(
      collector(company),
    300000 
    );

  const elapsed =
    ((Date.now() - start) / 1000).toFixed(1);

  console.log(
    `${company.name} completed in ${elapsed}s`
  );
} catch (error) {

  const elapsed =
    ((Date.now() - start) / 1000).toFixed(1);

  console.log(
    `${company.name} failed after ${elapsed}s`
  );

  console.log(error);

 try {
  await CrawlStat.findByIdAndUpdate(
    crawlStat._id,
    {
      completedAt: new Date(),
      status: "FAILED",
    }
  );
} catch (e) {
  console.error("Failed to update CrawlStat:", e.message);
}

  return {
    success: false,
    company: company.name,
    collector: company.jobBoardType,
    jobsFetched: 0,
    jobsAdded: 0,
  };
}

const detailedJobs =
  await enrichCollectorDetails(
    jobs,
    company
  );

const jobsToInsert = [];

for (let job of detailedJobs) {

  if (!job.title) {
    continue;
  }

  job = enrichJob(job);

  job.roleCategory =
    categorizeRole(job.title, job.description);

  job.eligibilityLevel =
    getEligibilityLevel(job.title);

  jobsToInsert.push(job);
}
  let jobsAdded = 0;

  try {

    if (jobsToInsert.length > 0) {

      console.log(
        `Writing ${jobsToInsert.length} jobs`
      );
const debugJob = jobsToInsert.find(
  job => job.title === "IP Release Principal Engineer"
);


      const operations =
        jobsToInsert.map((job) => ({
          updateOne: {
            filter: {
              company: job.company,
              externalJobId:
                job.externalJobId,
            },

           update: {
  $set: buildJobUpdate(job),

  $setOnInsert: {
    createdAt: new Date(),
  },
},

            upsert: true,
          },
        }));
console.log("Before bulkWrite");


      const result =
        await Job.bulkWrite(
          operations
        );

console.log("After bulkWrite");
      console.log(
        "bulkWrite completed"
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
  company: company.name,
  collector: company.jobBoardType,
  jobsFetched: 0,
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
    `========== END ${company.name} ==========\n`
  );

  return {
  success: true,
  company: company.name,
  collector: company.jobBoardType,
  jobsFetched: jobs.length,
  jobsAdded,
};
}
const runDiscovery = async () => {
  let totalJobsFetched = 0;

const successfulCollectors = [];
const failedCollectors = [];

  console.log(
    "Discovery Runner Started"
  );
const filter =
  process.argv[2] ||
  process.env.FILTER;

let query = {};

if (filter?.includes(",")) {

  query = {
    name: {
      $in: filter
        .split(",")
        .map(s => s.trim())
    }
  };

} else if (filter) {

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
  console.log(
  "Starting loop"
);

  let totalJobsAdded = 0;

  let totalCompaniesProcessed = 0;

  let totalCompaniesFailed = 0;
  const failedCompanies = [];

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
      console.log(
  `Batch ${i}`
);
   let results = [];

try {
  results = await Promise.all(
    batch.map(processCompany)
  );
} catch (err) {
  console.error("Batch failed:", err);
  continue;
}
console.log(
  `Batch ${i} completed`
);
if (
  batch[0]?.jobBoardType === "ASHBY"
) {
  await new Promise(resolve =>
    setTimeout(resolve, 2000)
  );
}


    for (const result of results) {

      totalCompaniesProcessed++;

      totalJobsAdded +=
        result.jobsAdded;
if (!result.success) {
  totalCompaniesFailed++;

  failedCompanies.push(
    result.company
  );
}
totalJobsFetched += result.jobsFetched;

if (result.success) {
  successfulCollectors.push(result.collector);
} else {
  failedCollectors.push({
    company: result.company,
    collector: result.collector
  });
}
    }
  }
  console.log(
  "All companies processed"
);

console.log(
  "Updating RunStat"
);

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
  "RunStat updated"
);

  console.log(
    "Discovery completed"
  );

 console.log("\n========== DISCOVERY SUMMARY ==========\n");

console.log(`Companies Loaded     : ${companies.length}`);
console.log(`Successful           : ${totalCompaniesProcessed - totalCompaniesFailed}`);
console.log(`Failed               : ${totalCompaniesFailed}`);

console.log(`Jobs Fetched         : ${totalJobsFetched}`);
console.log(`New Jobs Added       : ${totalJobsAdded}`);

console.log(`Companies Crwaled      : ${successfulCollectors.length + failedCollectors.length}`);

if (failedCollectors.length) {
  console.log("\nFailed Collectors:");
  console.table(failedCollectors);
}
console.log(
  `Insert Rate          : ${totalJobsAdded}/${totalJobsFetched}`
);

console.log("\n=======================================\n");
};
export default runDiscovery;