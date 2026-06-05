import mongoose from "mongoose";
import dotenv from "dotenv";

import Company from "../models/Company.js";
import companies from "../data/companies.json" with { type: "json" };
dotenv.config();

const seedCompanies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Company.deleteMany();

    console.log("Existing companies removed");

    await Company.insertMany(companies);

    console.log(`${companies.length} companies inserted`);

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedCompanies();