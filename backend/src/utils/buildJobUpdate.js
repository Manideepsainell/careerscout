const buildJobUpdate = (job) => ({
  title: job.title,
  location: job.location,

  jobType: job.jobType,

  department: job.department,
  team: job.team,
  workplace: job.workplace,

  jobUrl: job.jobUrl,
  detailUrl: job.detailUrl,

  description: job.description,
  experience: job.experience,

  experienceYearsMin: job.experienceYearsMin,
  experienceYearsMax: job.experienceYearsMax,
  experienceSource: job.experienceSource,
  experienceConfidence: job.experienceConfidence,

  salary: job.salary,

  source: job.source,

  primaryLocation: job.primaryLocation,
  secondaryLocations: job.secondaryLocations,
  hasMultipleLocations: job.hasMultipleLocations,

  score: job.score,
  roleCategory: job.roleCategory,
  eligibilityLevel: job.eligibilityLevel,
  experienceBand: job.experienceBand,

  // Workday metadata
  canApply: job.canApply,
  endDate: job.endDate,
  posted: job.posted,
  applicationDeadline:
  job.applicationDeadline,

applicationUrgency:
  job.applicationUrgency,
  startDate: job.startDate,
  timeLeftToApply: job.timeLeftToApply,
  jobPostingEndDateAsText:
    job.jobPostingEndDateAsText,

  status: "ACTIVE",
  postedDate: job.postedDate,
  lastSeenAt: new Date(),
});

export default buildJobUpdate;