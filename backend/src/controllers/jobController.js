import Job from "../models/Job.js";
import CustomError from "../utils/customError.js";
import asyncHandler from "../utils/asyncHandler.js";
import getJobTier
from "../intelligence/jobTierCalculator.js";
import getLocationTier
from "../intelligence/locationTier.js";
import getFreshnessScore
from "../intelligence/freshnessScorer.js";

const calculateScore = (job) => {
  let score = 0;
  const reasons = [];

 const title =
  (job.title || "").toLowerCase();

const experience =
  (job.experience || "").toLowerCase();;
  const locationTier =
  getLocationTier(job.location);
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
  score -= 10;
}
// Role Category Scoring

if (job.roleCategory === "BACKEND") {
  score += 50;
  reasons.push("Backend category");
}

if (job.roleCategory === "FULLSTACK") {
  score += 45;
  reasons.push("Full Stack category");
}

if (job.roleCategory === "GENERAL_SOFTWARE") {
  score += 20;
  reasons.push("Software category");
}

if (job.roleCategory === "FRONTEND") {
  score += 20;
  reasons.push("Frontend category");
}

if (job.roleCategory === "DEVOPS") {
  score += 20;
  reasons.push("DevOps category");
}

if (job.roleCategory === "DATA_ENGINEERING") {
  score += 20;
  reasons.push("Data Engineering category");
}

if (job.roleCategory === "QA") {
  score -= 30;
  reasons.push("QA category");
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
if (job.experienceBand === "FRESHER") {
  score += 40;
  reasons.push("Fresher profile");
}

if (job.experienceBand === "JUNIOR") {
  score += 20;
  reasons.push("Junior profile");
}

if (job.experienceBand === "MID_LEVEL") {
  score += 5;
  reasons.push("Mid profile");
}
  // Location Match
  switch (locationTier) {

  case "TIER_1":
    score += 40;
    reasons.push("Remote / Hybrid");
    break;

  case "TIER_2":
    score += 35;
    reasons.push("Hyderabad location");
    break;

  case "TIER_3":
    score += 30;
    reasons.push("Preferred location");
    break;

  case "TIER_4":
    score += 20;
    reasons.push("Acceptable location");
    break;

  case "TIER_5":
    score += 10;
    reasons.push("Other India");
    break;

  case "OUTSIDE_INDIA":
    score -= 80;
    reasons.push("Outside preferred geography");
    break;
}
  //Role Match
  
if (
  title.includes("nodejs") ||
  title.includes("node.js") ||
  title.includes("node js") ||
  title.includes("node")
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
  score -= 100;
}

if (job.eligibilityLevel === "LEAD") {
  score -= 120;
}

if (job.eligibilityLevel === "MANAGER") {
  score -= 140;
}

if (job.eligibilityLevel === "STAFF") {
  score -= 160;
}

if (job.eligibilityLevel === "PRINCIPAL") {
  score -= 200;
}
switch (job.freshness) {

  case "TODAY":
    score += 40;
    break;

  case "VERY_FRESH":
    score += 35;
    break;

  case "FRESH":
    score += 25;
    break;

  case "RECENT":
    score += 15;
    break;

  case "ACTIVE":
    score += 5;
    break;

  case "OLD":
    score -= 10;
    break;

  case "STALE":
    score -= 30;
    break;
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
filter.status = "ACTIVE";
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
  filter.location = {
    $regex: req.query.location,
    $options: "i",
  };
}

if (req.query.status) {
  filter.status = req.query.status;
}
let sortOption = {
  createdAt: -1
};

if (req.query.sort === "latest") {
  sortOption = {
    postedDate: -1
  };
}
if (
  req.query.sort === "oldest"
) {
  sortOption = {
    createdAt: 1
  };
}

if (
  req.query.sort ===
  "recommended"
) {
  sortOption = {};
}


if (req.query.level) {
  filter.eligibilityLevel =
    req.query.level;
}
if (req.query.experienceBand) {
  filter.experienceBand =
    req.query.experienceBand;
}

if (req.query.role) {
  filter.roleCategory =
    req.query.role;
}
else if (
  req.query.softwareOnly === "true"
) {
  filter.roleCategory = {
    $in: [
      "BACKEND",
      "FULLSTACK",
      "FRONTEND",
      "DEVOPS",
      "DATA_ENGINEERING",
      "QA",
      "GENERAL_SOFTWARE",
    ],
  };
}
;

const jobs = await Job.find(filter)
  .sort(sortOption)
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
        "SENIOR",
        "LEAD",
        "MANAGER",
        "STAFF",
        "PRINCIPAL",
      ].includes(job.eligibilityLevel) &&
      job.experienceBand !== "SENIOR"
  );
}


if (req.query.sort === "recommended") {

  filteredJobs.sort(
    (a, b) =>
      b.calculatedScore.score -
      a.calculatedScore.score
  );

  const companyCount = {};
  const diversifiedJobs = [];

  for (const job of filteredJobs) {

    const companyName =
      job.company?.name || "Unknown";

    companyCount[companyName] =
      companyCount[companyName] || 0;

    if (companyCount[companyName] < 2) {
      diversifiedJobs.push(job);
      companyCount[companyName]++;
    }
  }

  filteredJobs = diversifiedJobs;
}
else {

  

  filteredJobs.sort(
    (a, b) =>
      new Date(b.postedDate || 0) -
      new Date(a.postedDate || 0)
  );

  const firstBatch =
    filteredJobs.slice(0, 50);

  const remainingJobs =
    filteredJobs.slice(50);

  const companyCount = {};
  const diversifiedLatest = [];

  for (const job of firstBatch) {

    const companyName =
      job.company?.name || "Unknown";

    companyCount[companyName] =
      companyCount[companyName] || 0;

    if (companyCount[companyName] < 3) {
      diversifiedLatest.push(job);
      companyCount[companyName]++;
    }
  }

  filteredJobs = [
    ...diversifiedLatest,
    ...remainingJobs,
  ];
}
if (req.query.sort === "latest") {

  const cutoffDate = new Date();

  cutoffDate.setDate(
    cutoffDate.getDate() - 30
  );

  filteredJobs = filteredJobs.filter(
    job =>
      job.postedDate &&
      new Date(job.postedDate) >= cutoffDate
  );

}
const top10kJobs = filteredJobs
  .filter(
    job => job.source === "10KCODERS"
  )
  .slice(0, 5);

const recommendedJobs = filteredJobs
  .filter(
    job => job.source !== "10KCODERS"
  );
const totalJobs =

  recommendedJobs.length;

const totalPages =
  Math.ceil(totalJobs / limit);

const startIndex =
  (page - 1) * limit;

const endIndex =
  startIndex + limit;

const paginatedJobs =
  recommendedJobs.slice(
    startIndex,
    endIndex
  );
res.status(200).json({
  success: true,
  page,
  limit,
  count: recommendedJobs.length,
  totalJobs,
  totalPages,
  top10kJobs,
  data: paginatedJobs,
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
    const top10kJobs = uniqueJobs
  .filter(
    job => job.source === "10KCODERS"
  )
  .slice(0, 5);

const recommendedJobs = uniqueJobs
  .filter(
    job => job.source !== "10KCODERS"
  );

    res.status(200).json({
  success: true,
  count: uniqueJobs.length,
  top10kJobs,
  data: recommendedJobs,
});
  });
const markApplied =
  asyncHandler(async (req, res) => {

    const job =
      await Job.findByIdAndUpdate(
        req.params.id,
        {
          status: "APPLIED",
        },
        {
          new: true,
        }
      );

    res.status(200).json(job);
});
const markExpired =
  asyncHandler(async (req, res) => {

    const job =
      await Job.findByIdAndUpdate(
        req.params.id,
        {
          status: "EXPIRED",
        },
        {
          new: true,
        }
      );

    res.status(200).json(job);

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
const getNewJobs =
  asyncHandler(async (req, res) => {

    const yesterday = new Date();

    yesterday.setDate(
      yesterday.getDate() - 1
    );

   const filter = {
  lastSeenAt: {
    $gte: yesterday,
  },
};

    if (req.query.role) {
      filter.roleCategory =
        req.query.role;
    }

    if (req.query.level) {
      filter.eligibilityLevel =
        req.query.level;
    }

    if (req.query.location) {
      filter.location = {
        $regex: req.query.location,
        $options: "i",
      };
    }

    const jobs =
      await Job.find(filter)
        .populate("company")
        .sort({
          createdAt: -1,
        })
        .limit(100);

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });

  });
export {
  getJobs,
  getNewJobs,
  getFresherJobs,
  markApplied,
  markExpired,
  getJobById,
  createJob,
  deleteJob,
  updateJob
};