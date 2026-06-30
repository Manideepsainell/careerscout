const buildJobUpdate = (job) => ({
  title: job.title,
  location: job.location,

  jobType: job.jobType,

  department: job.department,
  team: job.team,
  workplace: job.workplace,

  experience: job.experience,

  experienceYearsMin: job.experienceYearsMin,
  experienceYearsMax: job.experienceYearsMax,
  experienceSource: job.experienceSource,
  experienceConfidence: job.experienceConfidence,

  salary: job.salary,

  source: job.source,
  jobUrl: job.jobUrl,

  description: job.description,

  primaryLocation: job.primaryLocation,
  secondaryLocations: job.secondaryLocations,
  hasMultipleLocations: job.hasMultipleLocations,

  score: job.score,
  roleCategory: job.roleCategory,
  eligibilityLevel: job.eligibilityLevel,
  experienceBand: job.experienceBand,

  status: "ACTIVE",
  postedDate: job.postedDate,
  lastSeenAt: new Date(),
});

export default buildJobUpdate;