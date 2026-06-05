import Job from "../models/Job.js";
import CustomError from "../utils/customError.js";
import asyncHandler from "../utils/asyncHandler.js";
const calculateScore = (job) => {
  let score = 0;
  const reasons = [];

  const title = job.title.toLowerCase();
  const location = job.location.toLowerCase();
  const experience = job.experience.toLowerCase();

  // Role Match
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
if (location.includes("remote")) {
  score += 15;
  reasons.push("Remote opportunity");
}

if (location.includes("hyderabad")) {
  score += 15;
  reasons.push("Hyderabad location");
}
  //Role Match
if (title.includes("node")) {
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
return {
  score,
  reasons,
};
};
const getJobs = asyncHandler(async (req, res) => {
const filter = {};
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
const limit = Number(req.query.limit) || 5;
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
const totalJobs = await Job.countDocuments(filter);
const totalPages = Math.ceil(totalJobs / limit);
const jobs = await Job.find(filter)
  .sort(sortOption)
  .skip(skip)
  .limit(limit)
  .populate("company");

 const scoredJobs = jobs.map((job) => ({
  ...job.toObject(),
  calculatedScore: calculateScore(job),
}));
scoredJobs.sort(
  (a, b) => b.calculatedScore.score - a.calculatedScore.score
);
   res.status(200).json({
  success: true,
  page,
  limit,
  count: jobs.length,
  totalJobs,
  totalPages,
  data: scoredJobs,
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
  getJobById,
  createJob,
  deleteJob,
  updateJob
};