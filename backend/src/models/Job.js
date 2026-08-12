import mongoose from "mongoose";

const METADATA_SOURCES = [
  "",
  "STRUCTURED",
  "DESCRIPTION",
  "TITLE",
];
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
    primaryLocation: {
  type: String,
  default: "",
},

secondaryLocations: {
  type: [String],
  default: [],
},

hasMultipleLocations: {
  type: Boolean,
  default: false,
},
department: {
  type: String,
  default: "",
},

team: {
  type: String,
  default: "",
},
detailUrl: {
  type: String,
  default: "",
},
businessUnit: {
  type: String,
  default: "",
},
    jobType: {
      type: String,
      default: "Full Time",
    },
    workplace: {
  type: String,
  default: "",
},

workplaceSource: {
  type: String,
  default: "",
},

workplaceConfidence: {
  type: Number,
  default: null,
},

    experience: {
      type: String,
      default: "Not Specified",
    },
    experienceYearsMin: {
  type: Number,
  default: null,
},

experienceYearsMax: {
  type: Number,
  default: null,
},

experienceSource: {
  type: String,
  default: "",
},

experienceConfidence: {
  type: Number,
  default: null,
},

    salary: {
      type: String,
      default: "Not Disclosed",
    },
    salaryMin: {
  type: Number,
  default: null,
},

salaryMax: {
  type: Number,
  default: null,
},

salaryCurrency: {
  type: String,
  default: "",
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
    skills: {
  type: [String],
  default: [],
},

skillsSource: {
  type: String,
  default: "",
},

skillsConfidence: {
  type: Number,
  default: null,
},
educationLevel: {
  type: String,
  default: "",
},

educationSource: {
  type: String,
  default: "",
},

educationConfidence: {
  type: Number,
  default: null,
},
techCategories: {
  type: [String],
  default: [],
},

techCategoriesSource: {
  type: String,
  default: "",
},

techCategoriesConfidence: {
  type: Number,
  default: null,
},
hiringProgram: {
  type: String,
  default: "",
},

hiringProgramSource: {
  type: String,
  default: "",
},

hiringProgramConfidence: {
  type: Number,
  default: null,
},
supportRole: {
  type: String,
  default: "",
},

supportRoleSource: {
  type: String,
  default: "",
},

supportRoleConfidence: {
  type: Number,
  default: null,
},
    score: {
      type: Number,
      default: 0,
    },
roleCategory: {
  type: String,
  default: "OTHER",
},
locationTier: {
  type: String,
  enum: [
    "TIER_1",
    "TIER_2",
    "TIER_3",
    "TIER_4",
    "TIER_5",
    "OUTSIDE_INDIA",
    "UNKNOWN",
  ],
  default: "UNKNOWN",
},
eligibilityLevel: {
  type: String,
  default: "GENERAL",
},validity: {
  type: String,
  enum: ["UNKNOWN", "ALIVE", "DEAD"],
  default: "UNKNOWN",
},

lastValidatedAt: {
  type: Date,
  default: null,
},

validityReason: {
  type: String,
  default: "",
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
applicationDeadline: {
  type: Date,
  default: null,
},

applicationUrgency: {
  type: String,
  enum: [
    "URGENT",
    "SOON",
    "OPEN",
    "UNKNOWN",
  ],
  default: "UNKNOWN",
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