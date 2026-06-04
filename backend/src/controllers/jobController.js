import Job from "../models/Job.js";
import CustomError from "../utils/customError.js";
import asyncHandler from "../utils/asyncHandler.js";
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
   res.status(200).json({
  success: true,
  page,
  limit,
  count: jobs.length,
  totalJobs,
  totalPages,
  data: jobs,
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