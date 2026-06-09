import categorizeRole from "../utils/jobCategorizer.js";

const titles = [
  "Backend Developer",
  "Full Stack Engineer",
  "Java Developer",
  "MERN Stack Developer",
  "QA Engineer",
  "Customer Support Associate",
  "Software Engineer",
  "Associate Software Engineer",
"Graduate Engineer Trainee",
"Member Technical Staff",
];

for (const title of titles) {
  console.log(
    `${title} -> ${categorizeRole(title)}`
  );
}