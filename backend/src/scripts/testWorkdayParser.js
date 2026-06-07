import {
  buildWorkdayJobsEndpoint,
} from "../utils/workday.js";

console.log(
  buildWorkdayJobsEndpoint(
    "https://browserstack.wd3.myworkdayjobs.com/External"
  )
);
import {
  buildWorkdayJobUrl,
} from "../utils/workday.js";

console.log(
  buildWorkdayJobUrl(
    "https://browserstack.wd3.myworkdayjobs.com/External",
    "/job/Mumbai-Remote/Account-Manager---Strategic-Sales_JR103265"
  )
);