import mongoose from "mongoose";

const crawlStatSchema =
  new mongoose.Schema(
    {
      source: {
        type: String,
        required: true,
      },

      company: {
        type: String,
        required: true,
      },

      startedAt: {
        type: Date,
        required: true,
      },

      completedAt: {
        type: Date,
      },

      jobsAdded: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: [
          "RUNNING",
          "SUCCESS",
          "FAILED",
        ],
        default: "RUNNING",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "CrawlStat",
  crawlStatSchema
);