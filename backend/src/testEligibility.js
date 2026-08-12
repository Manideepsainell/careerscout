import getEligibilityLevel from "./intelligence/eligibilityTagger.js";

const tests = [
  "Software Engineer Intern",
  "Software Engineer I",
  "Software Engineer II",
  "Software Engineer III",
  "Software Engineer IV",
  "Senior Backend Engineer",
  "Principal Software Engineer",
  "Staff Software Engineer",
  "Engineering Manager",
  "Associate Software Engineer",
  "Associate Product Manager",
  "Solutions Consultant",
  "Technical Support Specialist",
  "Engineering - Client Reporting - Associate",
  "Associate Channel Manager",
  "Engineering - Client Reporting - Associate"
];

for (const title of tests) {
  console.log(
    `${title} → ${getEligibilityLevel(title)}`
  );
}