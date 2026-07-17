
# CareerScout Collector Audit
# ROLE

You are a reverse engineer analyzing an Applicant Tracking System (ATS) collector.

This is NOT a code review.

This is NOT a software engineering review.

Your job is to extract factual evidence from the source code so another system can implement automatic dead-job detection.

If you suggest:
- code improvements
- refactoring
- architecture changes
- performance optimizations
- coding style
- best practices

your response is incorrect.

Only report facts that can be proven from the provided code.
## Objective

Analyze this collector to determine the most reliable strategy for automatic dead job detection.

This is a research task.

DO NOT:

- Refactor code
- Improve architecture
- Suggest optimizations
- Rewrite functions

ONLY extract evidence.

---
# Output

Return ONLY valid JSON.

Do not use markdown.

Do not explain your reasoning.

Do not add headings.

Do not wrap the JSON in code fences.

The first character of the response must be {

The last character must be }
Ex:
{
  "collector": "GREENHOUSE",
  "stableJobId": {
    "field": "id",
    "confidence": "HIGH"
  },
  "listEndpoint": {
    "exists": true,
    "method": "GET",
    "url": "/boards/{board}/jobs"
  },
  "detailEndpoint": {
    "exists": true,
    "method": "GET",
    "url": "/jobs/{id}"
  },
  "statusField": {
    "exists": false,
    "field": "UNKNOWN",
    "values": []
  },
  "closedJobBehavior": "404",
  "supportsListDiff": true,
  "supportsDetailCheck": true,
  "recommendedStrategy": "DETAIL_CHECK",
  "confidence": "HIGH",
  "evidence": [
    {
      "reason": "Job ID is extracted from API response.",
      "code": "posting.id"
    }
  ]
}

---

## Rules

- Never assume.
- Only use code evidence.
-For every field, provide only the minimum code snippet necessary as evidence.

-Never explain the code unless the schema explicitly requests a reason.
- If something cannot be proven, return UNKNOWN.
- Ignore coding style.
- Ignore performance.
- Ignore architecture.

Only analyze dead-job detection.

---

# Collector Information

- **Collector:** RIPPLEHIRE
- **Generated:** 18/7/2026, 12:45:50 am
- **Files Included:** 3

---

# Source Code


============================================================
FILE: src\collectors\rippleHire\fetchRippleHireDetails.js
============================================================

```javascript
import axios from "axios";

const fetchRippleHireDetails =
  async (job) => {

    try {

      const response =
        await axios.get(
          job.detailUrl,
          {
            timeout: 20000,
          }
        );

      const item =
        response.data.jobVO;

      if (!item) {
        return {};
      }

      return {

        description:
          item.jobDesc || "",

        primaryLocation:
          item.locations ||
          item.jobLocation ||
          "",

        secondaryLocations: [],

        hasMultipleLocations:
          false,

        jobType:
          item.jobTypeCustom3 ||
          job.jobType,

      };

    } catch {

      return {};

    }

  };

export default fetchRippleHireDetails;
```


============================================================
FILE: src\collectors\rippleHire\ripplehireCollector.js
============================================================

```javascript
import getRippleHireJobs
  from "../../utils/rippleHire.js";

const collectRippleHireJobs =
  async (company) => {

    const jobs =
      await getRippleHireJobs(
        company.openPositionsUrl,
        company.rippleHireToken
      );

    return jobs.map((job) => ({

      title:
        job.jobTitle,

      company:
        company._id,

      location:
        job.locations ||
        "Not Specified",

      source:
        "RIPPLEHIRE",

    experience:
  job.jobReqExp ||
  job.mobileReqJobExp ||
  "",

      externalJobId:
        String(job.jobSeq),

      jobUrl:
        `${company.careersUrl}/job/${job.jobSeq}`,

      detailUrl:
`${company.careersUrl}/candidate/candidatejobdetail?token=${company.rippleHireToken}&jobSeq=${job.jobSeq}&source=CAREERSITE&lang=en`,

      description: "",

      jobType: "Full Time",

      postedDate:
        job.jobPostingDate
          ? new Date(job.jobPostingDate)
          : null,

    }));
  };

export default collectRippleHireJobs;
```


============================================================
FILE: src\utils\rippleHire.js
============================================================

```javascript
import axios from "axios";
import qs from "qs";

const getRippleHireJobs = async (
  careersUrl,
  token
) => {

  let page = 0;
  const pageSize = 10;

  let allJobs = [];

  while (true) {
 const payload = qs.stringify({
  careerSiteUrlParams: JSON.stringify({
    page,
    search: "*:*",
    token,
    source: "CAREERSITE",
    pagesize: pageSize,
    

  }),
  lang: "en"
});
const response = await axios.post(
  careersUrl,
  payload,
  {
    headers: {
      Accept:
        "application/json, text/javascript, */*; q=0.01",

      "Content-Type":
        "application/x-www-form-urlencoded; charset=UTF-8",

      "X-Requested-With":
        "XMLHttpRequest",

      Origin: careersUrl,

      Referer: careersUrl,

      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    },
  }
);

    const jobs =
      response.data?.jobVoList || [];

    if (jobs.length === 0) {
      break;
    }

    allJobs.push(...jobs);
const totalJobs =
  response.data?.totalJobCount || 0;

if (allJobs.length >= totalJobs) {
  break;
}
    

    page++;
  }

  return allJobs;
};

export default getRippleHireJobs;
```



---

# Reminder

This is a research task.

Focus ONLY on discovering:

- Stable Job Identifier
- List Endpoint
- Detail Endpoint
- Job Status Field
- Closed Job Behaviour
- Dead Job Detection Strategy

Do not suggest code improvements.

Return ONLY the requested JSON.

