import fetchWorkdayDetails from "../workday/fetchWorkdayDetails.js";
import fetchOracleDetails from "../oracle/fetchOracleDetails.js";
import fetchAshbyDetails from "../ashby/fetchAshbyDetails.js";
import fetchEightfoldDetails from "../eightfold/fetchEightfoldDetails.js";
import fetchRippleHireDetails
  from "../rippleHire/fetchRippleHireDetails.js";
  import fetchZwayamDetails from "../zwayam/fetchZwayamDetails.js";
  import fetchZohoRecruitDetails from "../zoho/fetchZohoRecruitDetails.js";

export default {
  WORKDAY: fetchWorkdayDetails,
  ORACLE: fetchOracleDetails,
  ASHBY: fetchAshbyDetails,
  EIGHTFOLD: fetchEightfoldDetails,
  RIPPLEHIRE:
  fetchRippleHireDetails,
  ZWAYAM: fetchZwayamDetails,
  ZOHO_RECRUIT: fetchZohoRecruitDetails,
};