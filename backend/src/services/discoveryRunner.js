import Company from "../models/Company.js";
import Job from "../models/Job.js";
import collectWorkdayJobs from "../collectors/workdayCollector.js";
import collectGreenhouseJobs from "../collectors/greenhouseCollector.js";
import collectSmartRecruitersJobs from "../collectors/smartRecruitersCollector.js";
import collectOracleJobs
from "../collectors/oracleCollector.js";
const runDiscovery = async () => {
  console.log("Discovery Runner Started");

const companies =
  await Company.find({
    jobBoardType:
      "ORACLE",
  });

  console.log(`Loaded ${companies.length} companies`);
  for (const company of companies) {
switch (company.jobBoardType) {
  case "WORKDAY": {
  const jobs = await collectWorkdayJobs(company);

  let newJobsCount = 0;

  for (const job of jobs) {
    const existingJob = await Job.findOne({
  company: job.company,
  externalJobId: job.externalJobId,
});

    if (existingJob) {
      continue;
    }

    await Job.create(job);

    newJobsCount++;
  }

  console.log(
    `${newJobsCount} new jobs stored`
  );

  break;
}case "GREENHOUSE": {
  const jobs = await collectGreenhouseJobs(company);

  let newJobsCount = 0;

  for (const job of jobs) {
    const existingJob = await Job.findOne({
      company: job.company,
      externalJobId: job.externalJobId,
    });

    if (existingJob) {
      continue;
    }

    await Job.create(job);

    newJobsCount++;
  }

  console.log(
    `${newJobsCount} new jobs stored`
  );

  break;
}

  case "SMARTRECRUITERS": {
  const jobs =
    await collectSmartRecruitersJobs(company);

  let newJobsCount = 0;

  for (const job of jobs) {
    const existingJob =
      await Job.findOne({
        company: job.company,
        externalJobId:
          job.externalJobId,
      });

    if (existingJob) {
      continue;
    }

    await Job.create(job);

    newJobsCount++;
  }

  console.log(
    `${newJobsCount} new jobs stored`
  );

  break;
}
case "ORACLE": {
  const jobs =
    await collectOracleJobs(company);

  let newJobsCount = 0;

  for (const job of jobs) {
    const existingJob =
      await Job.findOne({
        company: job.company,
        externalJobId:
          job.externalJobId,
      });

    if (existingJob) {
      continue;
    }

    await Job.create(job);

    newJobsCount++;
  }

  console.log(
    `${newJobsCount} new jobs stored`
  );

  break;
}
  default:
    console.log(
      `No collector configured for ${company.name}`
    );
}
}
};

export default runDiscovery;