import getExperienceBand from "../utils/getExperienceBand.js";
const titles = [
  "Software Development Engineer - II",
  "Senior Backend Engineer",
  "Engineer IV",
  "New College Grad - Software Engineer",
  "Platform Engineer",
  "Principal Software Engineer",
  "Intern - Test Engineering"
];

for (const title of titles) {
  console.log(
    title,
    "=>",
    getExperienceBand(title)
  );
}