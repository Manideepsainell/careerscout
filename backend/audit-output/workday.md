
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

- **Collector:** WORKDAY
- **Generated:** 18/7/2026, 12:26:51 am
- **Files Included:** 3

---

# Source Code


============================================================
FILE: src\collectors\workday\fetchWorkdayDetails.js
============================================================

```javascript
import axios from "axios";

const fetchWorkdayDetails = async (
  job,
  company
) => {

  try {

    const response =
      await axios.get(job.detailUrl, {
        timeout: 20000,
      });
    


const start = Date.now();

    const info =
      response.data.jobPostingInfo;

    return {
      description:
        info.jobDescription || "",

      jobType:
        info.timeType || job.jobType,

      primaryLocation:
        info.location || job.primaryLocation,

      secondaryLocations:
        info.additionalLocations || [],

      hasMultipleLocations:
        (info.additionalLocations?.length || 0) > 0,
    };

  } catch (error) {

  

  return {};
}
};

export default fetchWorkdayDetails;
```


============================================================
FILE: src\collectors\workday\workdayCollector.js
============================================================

```javascript
import axios from "axios";
import {
  buildWorkdayJobsEndpoint,
  buildWorkdayJobUrl,
  buildWorkdayDetailUrl,
} from "../../utils/workday.js";
const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
const parseWorkdayPostedDate = (
  postedOn
) => {
  if (!postedOn) return null;

  const text =
    postedOn.toLowerCase();

  if (text.includes("today")) {
    return new Date();
  }

  if (
    text.includes("yesterday")
  ) {
    const date = new Date();

    date.setDate(
      date.getDate() - 1
    );

    return date;
  }

  const match =
    text.match(/(\d+)/);

  if (match) {
    const date = new Date();

    date.setDate(
      date.getDate() -
        Number(match[1])
    );

    return date;
  }

  return null;
};
const collectWorkdayJobs = async (
  company
) => {
  
let endpoint =
  buildWorkdayJobsEndpoint(
    company.openPositionsUrl ||
    company.careersUrl
  );
const limit = 20;

let offset = 0;
let total = 0;

const allPostings = [];

while (true) {
 
  let response = null;

  for (
    let attempt = 1;
    attempt <= 3;
    attempt++
  ) {
    try {



      response = await axios.post(
        endpoint,
        {
          appliedFacets: {},
          limit,
          offset,
          searchText: "",
        },
        {
          timeout: 20000,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
      break;

    } catch (error) {

      
      if (
        attempt === 1 &&
        company.openPositionsUrl
      ) {
       

        endpoint =
          buildWorkdayJobsEndpoint(
            company.openPositionsUrl
          );

        continue;
      }

      if (attempt < 3) {
        await sleep(500);
      }
    }
  }

  if (!response) {
    

    break;
  }

  const {
    total: responseTotal,
    jobPostings,
  } = response.data;

  if (
    !Array.isArray(jobPostings)
  ) {
    

  

    break;
  }

  if (offset === 0) {
  total = responseTotal;


}

  if (!jobPostings.length) {
    break;
  }

 
  const maxJobs =
  company.workdayConfig?.maxJobs;

if (maxJobs) {
  const remaining =
    maxJobs - allPostings.length;

  allPostings.push(
    ...jobPostings.slice(0, remaining)
  );

  if (
    allPostings.length >= maxJobs
  ) {
    break;
  }
} else {
  allPostings.push(...jobPostings);
}


offset += jobPostings.length;


  
  if (
    allPostings.length >= total
  ) {
    break;
  }
}
const jobs = allPostings.map((posting) => ({
  title: posting.title,

  company: company._id,

  location: posting.locationsText,

  externalJobId:
    posting.externalPath?.split("/").pop() || "",

  source: "WORKDAY",

  jobUrl: buildWorkdayJobUrl(
    company.careersUrl || company.openPositionsUrl,
    posting.externalPath
  ),

  postedDate: parseWorkdayPostedDate(
    posting.postedOn
  ),

  // -------------------------
  // Metadata
  // -------------------------

  experience: "Not Specified",

  description: "",

  jobType: posting.timeType || "",

  salary: "",

  primaryLocation: posting.locationsText || "",

  secondaryLocations: [],

  hasMultipleLocations:
    (posting.additionalLocations?.length || 0) > 0,
detailUrl: buildWorkdayDetailUrl(
  company.openPositionsUrl || company.careersUrl,
  posting.externalPath
),

}));

  return jobs;
};

export default collectWorkdayJobs;
```


============================================================
FILE: src\utils\workday.js
============================================================

```javascript

const extractWorkdayInfo = (url) => {
  const parsed = new URL(url);

  const tenant = parsed.hostname.split(".")[0];

  const siteName = parsed.pathname.replace("/", "");

  return {
    tenant,
    siteName,
  };
};

const buildWorkdayJobsEndpoint = (url) => {
  const parsed = new URL(url);

  const hostname = parsed.hostname;

  const { tenant, siteName } =
    extractWorkdayInfo(url);

  return `https://${hostname}/wday/cxs/${tenant}/${siteName}/jobs`;
};
const buildWorkdayDetailUrl = (
  url,
  externalPath
) => {
  const parsed = new URL(url);

  const hostname = parsed.hostname;

  const { tenant, siteName } =
    extractWorkdayInfo(url);

  return `https://${hostname}/wday/cxs/${tenant}/${siteName}${externalPath}`;
};
const buildWorkdayJobUrl = (
  careersUrl,
  externalPath
) => {
  const parsed = new URL(careersUrl);

  const { siteName } =
    extractWorkdayInfo(careersUrl);

  return `${parsed.origin}/en-US/${siteName}${externalPath}`;
};
export {
  extractWorkdayInfo,
  buildWorkdayJobsEndpoint,
  buildWorkdayJobUrl,
  buildWorkdayDetailUrl,
};
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

