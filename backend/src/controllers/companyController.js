import Company from "../models/Company.js";
import Job from "../models/Job.js";
import CustomError from "../utils/customError.js";
import asyncHandler from "../utils/asyncHandler.js";
const getCompanies = asyncHandler(async (req, res) => {
  const filter = {};
  

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.location) {
    filter.location = req.query.location;
  }

  if (req.query.priority) {
    filter.priority = req.query.priority;
  }

  const companies = await Company.find(filter);

  res.status(200).json({
    success: true,
    count: companies.length,
    data: companies,
  });
});

const createCompany = asyncHandler(async (req, res) => {
    const company = await Company.create(req.body);

    res.status(201).json({
      success: true,
      data: company,
    });
  });
const getCompanyById = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);

    if (!company) {
      throw new CustomError("Company not found", 404);
    }

    res.status(200).json({
      success: true,
      data: company,
    });
  });

const updateCompany = asyncHandler(async (req, res) => {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!company) {
     throw new CustomError("Company not found", 404);
    }

    res.status(200).json({
      success: true,
      data: company,
    });
  });
const deleteCompany = asyncHandler(async (req, res) => {

    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
    throw new CustomError("Company not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } );

const getCompanyJobs = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);

    if (!company) {
     throw new CustomError("Company not found", 404);
    }

    const jobs = await Job.find({
      company: req.params.id,
    }).populate("company");

    res.status(200).json({
      success: true,
      company: company.name,
      count: jobs.length,
      data: jobs,
    });
  });
export {
  getCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getCompanyJobs
};