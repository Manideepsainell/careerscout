import categorizeRole from "./intelligence/jobCategorizer.js";
import getEligibilityLevel from "./intelligence/eligibilityTagger.js";

const tests = [
  {
    title: "Account Executive II",
    description:
      "Enterprise sales professional selling AI-powered SaaS solutions to customers.",
  },
  {
    title: "Enterprise Account Executive - South / TOLA",
    description:
      "Drive enterprise sales for an AI-powered cloud platform.",
  },
  {
    title: "IP/Product Counsel",
    description:
      "Provide legal counsel for AI, software, data, and product matters.",
  },
  {
    title: "Payer Strategy Director",
    description:
      "Develop strategic relationships and business initiatives across healthcare.",
  },
];

for (const job of tests) {
  const category = categorizeRole(
    job.title,
    job.description
  );

  const eligibility = getEligibilityLevel(
    job.title
  );

  console.log("\n--------------------------------");
  console.log(`Title       : ${job.title}`);
  console.log(`Category    : ${category}`);
  console.log(`Eligibility : ${eligibility}`);
}