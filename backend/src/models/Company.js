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
    openPositionsUrl: {
  type: String,
  default: "",
  
},
companyId: {
  type: String,
  default: "",
},
categoryId: {
  type: Number,
  default: 0,
},
rippleHireToken: {
  type: String,
  default: "",
},
careerSiteId: {
  type: Number,
},
companyType: {
  type: String
},

fresherFriendly: {
  type: String
},

backendStrength: {
  type: String
},

hiringPattern: {
  type: String
},

companyTier: {
  type: String
},

companyBoost: {
  type: Number,
  default: 0
},

careerSitePageId: {
  type: Number,
},

domain: {
  type: String,
  default: "",
},
jobBoardType: {
  type: String,
  enum: [
    "WORKDAY",
    "GREENHOUSE",
    "SMARTRECRUITERS",
    "EIGHTFOLD",
    "RIPPLEHIRE",
    "DARWINBOX",
    "SUCCESSFACTORS",
    "ORACLE",
    "CORNERSTONE",
    "LINKEDIN",
    "CUSTOM",
    "LEVER",
    "ACCENTURE",
    "INFOSYS",
    "CAPGEMINI",
    "IBM",
    "DARWINBOX",
    "SONATA SOFTWARE",
    "MASTECH",
    "10kCODERS",
    "ASHBY",
    "KULA",
    "FRESHTEAM",
    "TRAKSTAR",
    "UNKNOWN",

    
  ],
},
slug: {
  type: String
},
oracleConfig: {
  type: mongoose.Schema.Types.Mixed,
  maxJobs:200,
  default: {},
},
workdayConfig: {
  type: mongoose.Schema.Types.Mixed,
  maxJobs:250,
  default: {},
},
eightfoldConfig: {
  type: mongoose.Schema.Types.Mixed,
  maxJobs:250,
  default: {},
},
ashbyConfig: {
  type: mongoose.Schema.Types.Mixed,
  default: {},
},
taleoConfig: {
  type: mongoose.Schema.Types.Mixed,
  default: {},
},
successFactorsConfig: {
  type: mongoose.Schema.Types.Mixed,
  default: {},
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

locationMetadata: {
  hyderabad: {
    type: String,
    enum: [
      "MAIN_BRANCH",
      "BRANCH",
      "NOT_FOUND",
      "UNCLEAR",
      "REMOTE_ONLY",
    ],
    default: "UNCLEAR",
  },

  indiaLocations: {
    type: [String],
    default: [],
  },

  remoteIndia: {
    type: Boolean,
    default: false,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  verifiedAt: {
    type: Date,
    default: null,
  },

  source: {
    type: String,
    default: "",
  },
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
    priority: {
  type: String,
  enum: ["HIGH", "MEDIUM", "LOW"],
  default: "MEDIUM"
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