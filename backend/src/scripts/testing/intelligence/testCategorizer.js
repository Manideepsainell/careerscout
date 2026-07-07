import categorizeRole from "../../../intelligence/jobCategorizer.js";

const cases = [
  { title: "Backend Developer", description: "" },
  { title: "Full Stack Engineer", description: "" },
  { title: "Java Developer", description: "" },
  { title: "MERN Stack Developer", description: "" },
  { title: "QA Engineer", description: "" },
  { title: "Customer Support Associate", description: "" },
  { title: "Software Engineer", description: "" },
  { title: "Associate Software Engineer", description: "" },
  { title: "Graduate Engineer Trainee", description: "" },
  { title: "Member Technical Staff", description: "" },

  // These titles are generic on purpose - they only resolve correctly
  // via the new description fallback added to jobCategorizer.js
  {
    title: "Software Engineer",
    description:
      "You will build and maintain REST APIs using Node.js and Express, work with MongoDB, and design microservices for our platform.",
  },
  {
    title: "Member of Technical Staff",
    description:
      "Work across our Spring Boot services, design SQL schemas, and own distributed systems reliability.",
  },
  {
    title: "Software Engineer",
    description:
      "You will build user interfaces using React, work with Redux, and collaborate on our design system.",
  },
];

for (const { title, description } of cases) {
  console.log(
    `${title} -> ${categorizeRole(title, description)}`
  );
}