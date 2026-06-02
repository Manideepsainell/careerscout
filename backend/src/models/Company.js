import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    website: {
      type: String,
      default: "",
    },

    careersUrl: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: ["Startup", "Product", "SaaS", "Service", "Enterprise"],
      default: "Startup",
    },

    location: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      default: true,
    },

    crawlStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    lastCrawledAt: {
      type: Date,
    },

    lastSuccessAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const Company = mongoose.model("Company", companySchema);

export default Company;