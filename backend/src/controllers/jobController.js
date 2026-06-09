import Job from "../models/Job.js";
import CustomError from "../utils/customError.js";
import asyncHandler from "../utils/asyncHandler.js";
import getJobTier
from "../utils/jobTierCalculator.js";
import getFreshnessScore
from "../utils/freshnessScorer.js";
const calculateScore = (job) => {
  let score = 0;
  const reasons = [];

 const title =
  (job.title || "").toLowerCase();
const location =
  (job.location || "").toLowerCase();

const experience =
  (job.experience || "").toLowerCase();;
  const usKeywords = [
  "united states",
  "usa",
  "us",
  "new york",
  "california",
  "san francisco",
  "massachusetts",
  "texas",
  "florida",
  "washington",
  "seattle",
  "chicago",
  "boston",
  "idaho",
  "arlington",
];
const foreignCountries = [
  "taiwan",
  "singapore",
  "japan",
  "malaysia",
  "china",
  "korea",
  "canada",
  "germany",
  "france",
  "ireland",
  "poland"
];

  // Role Match
if (job.eligibilityLevel === "ENTRY_LEVEL") {
  score += 80;
  reasons.push("Entry level role");
}

if (job.eligibilityLevel === "INTERNSHIP") {
  score += 60;
  reasons.push("Internship role");
}
if (job.eligibilityLevel === "GENERAL") {
  score -= 50;
}

if (
  ["LEAD", "MANAGER", "STAFF", "PRINCIPAL"]
    .includes(job.eligibilityLevel)
) {
  score -= 20;
}
 if (title.includes("backend")) {
  score += 40;
  reasons.push("Backend role");
}

if (title.includes("software engineer")) {
  score += 35;
  reasons.push("Software Engineer role");
}
if (title.includes("software developer")) {
  score += 30;
  reasons.push("Software Developer role");
}

if (title.includes("junior developer")) {
  score += 25;
  reasons.push("Junior Developer role");
}

if (title.includes("associate engineer")) {
  score += 25;
  reasons.push("Associate Engineer role");
}

if (title.includes("associate software engineer")) {
  score += 30;
  reasons.push("Associate Software Engineer role");
}

if (title.includes("graduate engineer")) {
  score += 25;
  reasons.push("Graduate Engineer role");
}

if (title.includes("trainee")) {
  score += 20;
  reasons.push("Trainee role");
}
if (
  title.includes("full stack") ||
  title.includes("fullstack")
) {
  score += 35;
  reasons.push("Full Stack role");
}
if (title.includes("qa")) {
  score -= 40;
  reasons.push("QA role");
}

if (title.includes("support")) {
  score -= 40;
  reasons.push("Support role");
}
  // Experience Match
if (experience.includes("0-1")) {
  score += 30;
  reasons.push("0-1 years experience");
}
if (experience.includes("1-2")) {
  score += 15;
  reasons.push("1-2 years experience");
}

if (experience.includes("1-3")) {
  score += 15;
  reasons.push("1-3 years experience");
}
if (experience.includes("0-2")) {
  score += 30;
  reasons.push("0-2 years experience");
}
  // Location Match
  if (
  foreignCountries.some(country =>
    location.includes(country)
  )
) {
  score -= 80;
  reasons.push(
    "Outside preferred geography"
  );
}
if (location.includes("hyderabad")) {
  score += 25;
  reasons.push("Hyderabad location");
}

if (location.includes("remote")) {
  score += 20;
  reasons.push("Remote opportunity");
}

if (
  location.includes("pune") ||
  location.includes("bangalore") ||
  location.includes("bengaluru") ||
  location.includes("chennai") ||
  location.includes("noida")
) {
  score += 10;
  reasons.push("Preferred city");
}

if (
  usKeywords.some(keyword =>
    location.includes(keyword)
  )
) {
  score -= 80;
  reasons.push("Outside preferred geography");
}
if (job.company?.priority === "HIGH") {
  score += 20;
  reasons.push("High priority company");
}

if (job.company?.priority === "MEDIUM") {
  score += 10;
  reasons.push("Medium priority company");
}
  //Role Match
  
if (
  title.includes("nodejs") ||
  title.includes("node.js") ||
  title.includes("node js")
) {
  score += 35;
  reasons.push("Node.js role");
}

if (title.includes("mern")) {
  score += 35;
  reasons.push("MERN role");
}

if (title.includes("developer")) {
  score += 20;
  reasons.push("Developer role");
}
if (job.eligibilityLevel === "SENIOR") {
  score -= 30;
}

if (
  ["LEAD", "MANAGER", "STAFF", "PRINCIPAL"]
  .includes(job.eligibilityLevel)
) {
  score -= 50;
}
const freshnessScore =
  getFreshnessScore(job);

score += freshnessScore;
if (freshnessScore === 30) {
  reasons.push("Posted within 3 days");
}

if (freshnessScore === 20) {
  reasons.push("Posted within 7 days");
}

if (freshnessScore === 10) {
  reasons.push("Posted within 14 days");
}

if (freshnessScore === 5) {
  reasons.push("Posted within 30 days");
}
return {
  score,
  reasons,
};
};
const normalizeTitle = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
};
const getJobs = asyncHandler(async (req, res) => {
const filter = {};
if (req.query.days) {
  const days = Number(req.query.days);

  const cutoffDate = new Date();

  cutoffDate.setDate(
    cutoffDate.getDate() - days
  );

  filter.postedDate = {
  $gte: cutoffDate,
};
}
if (req.query.search) {
  filter.$or = [
    {
      title: {
        $regex: req.query.search,
        $options: "i",
      },
    },
    {
      location: {
        $regex: req.query.search,
        $options: "i",
      },
    },
    {
  description: {
    $regex: req.query.search,
    $options: "i",
  },
}
  ];
}

const page = Number(req.query.page) || 1;
const limit =
  Number(req.query.limit) || 20;
const skip = (page - 1) * limit;
if (req.query.jobType) {
  filter.jobType = req.query.jobType;
}

if (req.query.location) {
  filter.location = req.query.location;
}

if (req.query.status) {
  filter.status = req.query.status;
}
let sortOption = {};

if (req.query.sort === "latest") {
  sortOption = { createdAt: -1 };
}

if (req.query.sort === "oldest") {
  sortOption = { createdAt: 1 };
}
if (req.query.role) {
  filter.roleCategory =
    req.query.role;
}

if (req.query.level) {
  filter.eligibilityLevel =
    req.query.level;
}
if (req.query.experienceBand) {
  filter.experienceBand =
    req.query.experienceBand;
}

if (req.query.softwareOnly === "true") {
  filter.roleCategory = {
    $in: [
      "BACKEND",
      "FULLSTACK",
      "FRONTEND",
      "DEVOPS",
      "DATA_ENGINEERING",
      "QA",
      "GENERAL_SOFTWARE"
    ]
  };
}

const totalJobs = await Job.countDocuments(filter);
const totalPages = Math.ceil(totalJobs / limit);
const jobs = await Job.find(filter)
  .sort(sortOption)
  .skip(skip)
  .limit(limit)
  .populate("company");
const scoredJobs = jobs.map((job) => ({
  ...job.toObject(),

  tier: getJobTier(
    job.roleCategory,
    job.eligibilityLevel
  ),

  calculatedScore:
    calculateScore(job),
}));
const tierPriority = {
  TIER_1: 1,
  TIER_2: 2,
  TIER_3: 3,
  TIER_4: 4,
};
const uniqueJobsMap = new Map();

for (const job of scoredJobs) {
  const key =
    `${job.company?._id}-${normalizeTitle(job.title)}`;

  if (!uniqueJobsMap.has(key)) {
    uniqueJobsMap.set(key, job);
  }
}

const uniqueJobs = [...uniqueJobsMap.values()];
let filteredJobs = uniqueJobs;
if (req.query.excludeSenior === "true") {
  filteredJobs = filteredJobs.filter(
    (job) =>
      ![
        "LEAD",
        "MANAGER",
        "STAFF",
        "PRINCIPAL",
      ].includes(
        job.eligibilityLevel
      )
  );
}


filteredJobs.sort((a, b) => {

  const tierDifference =
    tierPriority[a.tier] -
    tierPriority[b.tier];

  if (tierDifference !== 0) {
    return tierDifference;
  }

  return (
    b.calculatedScore.score -
    a.calculatedScore.score
  );
});

res.status(200).json({
  success: true,
  page,
  limit,
  count: filteredJobs.length,
  totalJobs,
  totalPages,
  data: filteredJobs,
});
});

const getFresherJobs =
  asyncHandler(async (req, res) => {

    const filter = {
      roleCategory: {
        $in: [
          "BACKEND",
          "FULLSTACK",
          "FRONTEND",
          "DEVOPS",
          "DATA_ENGINEERING"
        ],
      },

      eligibilityLevel: {
        $in: [
          "ENTRY_LEVEL",
          "INTERNSHIP",
          "GENERAL"
        ],
      },
    };

    const jobs =
      await Job.find(filter)
        .populate("company");


    const scoredJobs = jobs.map(
      (job) => ({
        ...job.toObject(),
        calculatedScore:
          calculateScore(job),
      })
    );
    const uniqueJobsMap = new Map();

for (const job of scoredJobs) {
  const key =
    `${job.company?._id}-${normalizeTitle(job.title)}`;

  if (!uniqueJobsMap.has(key)) {
    uniqueJobsMap.set(key, job);
  }
}

const uniqueJobs =
  [...uniqueJobsMap.values()];

    uniqueJobs.sort(
      (a, b) =>
        b.calculatedScore.score -
        a.calculatedScore.score
    );

    res.status(200).json({
      success: true,
      count: uniqueJobs.length,
      data: uniqueJobs,
    });

  });
const createJob = asyncHandler(async (req, res) => {

    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      data: job,
    });
  });
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("company");

  if (!job) {
    throw new CustomError("Job not found", 404);
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

const deleteJob = asyncHandler(async (req, res) => {
    const job = await Job.findByIdAndDelete(req.params.id);

   if (!job) {
  throw new CustomError("Job not found", 404);
}
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
});
const updateJob = asyncHandler(async (req, res) => {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      throw new CustomError("Job not found", 404);}

    res.status(200).json({
      success: true,
      data: job,
    });
  });

export {
  getJobs,
  getFresherJobs,
  getJobById,
  createJob,
  deleteJob,
  updateJob
};