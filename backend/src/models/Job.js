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
roleCategory: {
  type: String,
  default: "OTHER",
},

eligibilityLevel: {
  type: String,
  default: "GENERAL",
},
experienceBand: {
  type: String,
  default: "UNKNOWN",
},
    status: {
  type: String,
  enum: [
    "ACTIVE",
    "APPLIED",
    "EXPIRED",
    "FILLED"
  ],
  default: "ACTIVE",
},

  postedDate: {
  type: Date,
},

lastSeenAt: {
  type: Date,
  default: Date.now,
},
},
{
  timestamps: true,
}
);

jobSchema.index(
  {
    company: 1,
    externalJobId: 1,
  },
  {
    unique: true,
  }
);

const Job = mongoose.model(
  "Job",
  jobSchema
);

export default Job;