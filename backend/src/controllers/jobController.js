import Job from "../models/Job.js";

const getJobs = async (req, res) => {
  try {
const filter = {};

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
const jobs = await Job.find(filter)
  .sort(sortOption)
  .populate("company");
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
   if (error.name === "ValidationError") {
  const firstError = Object.values(error.errors)[0].message;

  return res.status(400).json({
    success: false,
    message: firstError,
  });
}

res.status(500).json({
  success: false,
  message: error.message,
});
  }
};

const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getJobById = async (req, res) => {
  try {
   const job = await Job.findById(req.params.id).populate("company");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
  updateJob
};