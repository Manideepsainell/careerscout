import getFreshness from "./getFreshness.js";

const getFreshnessScore = (postedDate) => {
  switch (getFreshness(postedDate)) {
    case "TODAY":
      return 40;

    case "VERY_FRESH":
      return 30;

    case "FRESH":
      return 20;

    case "RECENT":
      return 10;

    case "ACTIVE":
      return 0;

    case "AGING":
      return -20;

    case "OLD":
      return -40;

    case "STALE":
      return -100;

    default:
      return -20;
  }
};

export default getFreshnessScore;