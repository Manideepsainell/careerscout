import getRippleHireJobs
  from "../utils/rippleHire.js";

const jobs =
  await getRippleHireJobs(
    "https://ltimindtree.ripplehire.com/candidate/candidatejobsearch"
  );

console.log(
  "Jobs fetched:",
  jobs.length
);

console.log(jobs[0]);

process.exit(0);