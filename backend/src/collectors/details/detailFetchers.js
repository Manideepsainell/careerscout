import fetchWorkdayDetails from "../workday/fetchWorkdayDetails.js";
import fetchOracleDetails from "../oracle/fetchOracleDetails.js";
import fetchAshbyDetails from "../ashby/fetchAshbyDetails.js";
import fetchEightfoldDetails from "../eightfold/fetchEightfoldDetails.js";

export default {
  WORKDAY: fetchWorkdayDetails,
  ORACLE: fetchOracleDetails,
  ASHBY: fetchAshbyDetails,
  EIGHTFOLD: fetchEightfoldDetails,
};