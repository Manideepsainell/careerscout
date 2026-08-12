import getExperienceBand from "./intelligence/getExperienceBand.js";

const tests = [
  {
    title: "Technical Support Specialist",
    description: "",
  },
  {
    title: "Solutions Consultant",
    description: "",
  },
  {
    title: "Software Consultant",
    description: "",
  },
  {
    title: "Product Specialist",
    description: "",
  },
  {
    title: "Customer Support Specialist",
    description: "",
  },
  {
    title: "Associate Product Manager",
    description: "",
  },
  {
    title: "Associate Account Executive",
    description: "",
  },
  {
    title: "Associate Software Engineer",
    description: "",
  },
  {
    title: "Site Reliability Engineer (4 to 8 Years)",
    description: "",
  },
  {
    title: "Site Reliability Engineer (4+ YOE)",
    description: "",
  },
  {
    title: "DevOps Engineer - II/III",
    description: "",
  },
  {
    title: "Software Engineer II",
    description: "",
  },
  {
    title: "Software Engineer III",
    description: "",
  },
  {
    title: "Software Engineer IV",
    description: "",
  },

  // Description-based YOE tests
  {
    title: "Backend Engineer",
    description: "Requires 8+ years of experience.",
  },
  {
    title: "Backend Engineer",
    description: "Requires 4-6 years of experience.",
  },
  {
    title: "Backend Engineer",
    description: "Requires 0-2 years of experience.",
  },
];

for (const test of tests) {
  console.log(
    `${test.title} → ${getExperienceBand(
      test.title,
      test.description
    )}`
  );
}