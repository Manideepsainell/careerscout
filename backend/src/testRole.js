import categorizeRole from "./intelligence/jobCategorizer.js";

const tests = [
  {
    title: "Account Executive II",
    description:
      "Sell our AI-powered SaaS platform to enterprise customers using data and cloud technologies.",
  },
  {
    title: "Enterprise Account Executive - South / TOLA",
    description:
      "Drive enterprise sales for an AI-powered cloud platform.",
  },
  {
    title: "IP/Product Counsel",
    description:
      "Provide legal counsel for AI, software and data products.",
  },
  {
    title: "Backend Engineer",
    description:
      "Build APIs, microservices and distributed backend systems.",
  },
  {
    title: "Engineering - Client Reporting - Associate",
    description: "",
  },
  {
  title: "ICQA Associate",
  description: "",
},
{
  title: "AI Intern",
  description: "",
},
];

for (const test of tests) {
  const result = categorizeRole(
    test.title,
    test.description
  );

  console.log(`${test.title} → ${result}`);
}