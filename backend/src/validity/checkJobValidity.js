import workdayChecker from "./checkers/workdayChecker.js";
import greenhouseChecker from "./checkers/greenhouseChecker.js";
import ashbyChecker from "./checkers/ashbyChecker.js";
const checkJobValidity = async (job) => {
  switch (job.source) {
    case "WORKDAY":
      return workdayChecker(job);
    case "GREENHOUSE":
  return greenhouseChecker(job);
  case "ASHBY":
  return ashbyChecker(job);
    default:
      return {
        validity: "UNKNOWN",
        reason: "UNSUPPORTED_SOURCE",
        checkedAt: new Date(),
      };
  }
};

export default checkJobValidity;