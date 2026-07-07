import getJobTier
from "../../../intelligence/jobTierCalculator.js";

console.log(
  getJobTier(
    "BACKEND",
    "ENTRY_LEVEL"
  )
);

console.log(
  getJobTier(
    "GENERAL_SOFTWARE",
    "ENTRY_LEVEL"
  )
);

console.log(
  getJobTier(
    "BACKEND",
    "SENIOR"
  )
);

console.log(
  getJobTier(
    "OTHER",
    "GENERAL"
  )
);