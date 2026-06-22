import mongoose from "mongoose";

const runStatSchema =
  new mongoose.Schema(
    {
      source: {
        type: String,
        required: true,
      },

      startedAt: {
        type: Date,
        required: true,
      },

      completedAt: Date,

      companiesProcessed: {
        type: Number,
        default: 0,
      },

      companiesFailed: {
        type: Number,
        default: 0,
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
  "RunStat",
  runStatSchema
);