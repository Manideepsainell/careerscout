import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
  type: String,
  required: [true, "Title is required"],
  trim: true,
},

   company: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Company",
  required: [true, "Company is required"],
},
    location: {
      type: String,
      default: "Not Specified",
    },

    jobType: {
      type: String,
      default: "Full Time",
    },

    experience: {
      type: String,
      default: "Not Specified",
    },

    salary: {
      type: String,
      default: "Not Disclosed",
    },

    source: {
  type: String,
  required: [true, "Source is required"],
},
    jobUrl: {
  type: String,
  required: [true, "Job URL is required"],
},
externalJobId: {
  type: String,
  default: "",
},

    description: {
      type: String,
      default: "",
    },

    score: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "FILLED"],
      default: "ACTIVE",
    },

    postedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;