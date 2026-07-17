
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

- **Collector:** GREENHOUSE
- **Generated:** 18/7/2026, 12:45:30 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\greenhouseCollector.js
============================================================

```javascript
import axios from "axios";
import {
  buildGreenhouseJobsEndpoint,
} from "../utils/greenhouse.js";

const collectGreenHouseJobs = async (
  company
) => {
  
try{
const endpoint =
  buildGreenhouseJobsEndpoint(
    company.openPositionsUrl ||
    company.careersUrl
  );



  const response = await axios.get(
    endpoint
  );

  return response.data.jobs.map((job) => ({
  title: job.title,

  company: company._id,

  location:
    job.location?.name ||
    "Not Specified",

  externalJobId: String(job.id),

  source: "GREENHOUSE",

  jobUrl: job.absolute_url,

  postedDate:
    job.first_published
      ? new Date(job.first_published)
      : job.updated_at
      ? new Date(job.updated_at)
      : null,

  description:
    job.content || "",

  experience:
    "Not Specified",

  jobType: "",

  salary: "",

  primaryLocation:
    job.location?.name || "",

  secondaryLocations: [],

  hasMultipleLocations: false,
}));
}
catch (error) {
    console.error(
      `${company.name}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export default collectGreenHouseJobs;
```


============================================================
FILE: src\utils\greenhouse.js
============================================================

```javascript
const buildGreenhouseJobsEndpoint = (
  url
) => {

  // Already an API endpoint
  if (
    url.includes(
      "boards-api.greenhouse.io"
    )
  ) {
    return url;
  }

  const parsed = new URL(url);

  let slug =
    parsed.searchParams.get("for");

  if (!slug) {
    slug = parsed.pathname
      .replace(/\/$/, "")
      .split("/")
      .pop();
  }

 return `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=true`;
};

export {
  buildGreenhouseJobsEndpoint,
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

