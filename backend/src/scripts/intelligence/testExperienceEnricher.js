import enrichExperience from "../../intelligence/enrichers/enrichExperience.js";

const jobs = [
  // Structured should win
  {
    name: "Structured Priority",
    experience: "0-2 Years",
    description: "Minimum 5 years of experience in Java.",
  },

  // Description fallback
  {
    name: "Description Fallback",
    experience: "Not Specified",
    description: "Minimum 3 years of experience in Java.",
  },

  // Description range
  {
    name: "Description Range",
    experience: "Not Specified",
    description: "MS or PhD (5-10 years relevant experience)",
  },

  // Description plus
  {
    name: "Description Plus",
    experience: "Not Specified",
    description: "4+ years of experience in partnerships",
  },

  // No experience anywhere
  {
    name: "Nothing Found",
    experience: "Not Specified",
    description: "Strong communication and teamwork skills.",
  },
];

console.log("\n========== Experience Enricher ==========\n");

for (const job of jobs) {
  const enriched = enrichExperience(job);

  console.log("----------------------------------------");
  console.log(job.name);

  console.log("Input:");
  console.log({
    experience: job.experience,
    description: job.description,
  });

  console.log("\nOutput:");
  console.log({
    experienceYearsMin: enriched.experienceYearsMin,
    experienceYearsMax: enriched.experienceYearsMax,
    experienceSource: enriched.experienceSource,
    experienceConfidence: enriched.experienceConfidence,
  });

  console.log();
}

console.log("========================================");