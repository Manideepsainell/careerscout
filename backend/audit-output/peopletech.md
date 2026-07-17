
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

- **Collector:** PEOPLETECH
- **Generated:** 18/7/2026, 12:45:49 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\peopletechCollector.js
============================================================

```javascript
import getPeopleTechJobs
  from "../utils/peopletech.js";

const collectPeopleTechJobs =
  async (company) => {

   

    const jobs =
      await getPeopleTechJobs(
        company.openPositionsUrl
      );

    
return jobs.map((job) => ({
  title: job.name,

  company: company._id,

  location:
    job.jobLocation ||
    "Not Specified",

  source: "PEOPLETECH",

  externalJobId: String(job.id),

  jobUrl:
    "https://peopletech.com/careers",

  description:
    job.description || "",

  department:
    job.operationId === 2
      ? "IT"
      : "",

  experience:
    String(job.experienceLevel),

  educationLevel:
    job.qualification?.name || "",

  skills:
    (job.skills || []).map(
      s => s.skill?.name
    ),

  postedDate:
    job.createdOn
      ? new Date(job.createdOn)
      : null,
}));
};

export default collectPeopleTechJobs;
```


============================================================
FILE: src\utils\peopletech.js
============================================================

```javascript
import axios from "axios";
import https from "https";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUxOSwiZmlyc3ROYW1lIjoiQ2FyZWVycyIsImxhc3ROYW1lIjoiQXBwbGljYXRpb24iLCJlbWFpbCI6ImNhcmVlcnNAcGVvcGxldGVjaC5jb20iLCJwaG9uZU51bWJlciI6bnVsbCwiZW1wbG95ZWVDb2RlIjpudWxsLCJjb21wYW55IjoxLCJkZXBhcnRtZW50IjoxLCJvcGVyYXRpb25zIjoxLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJhZG1pbiJ9XSwibG9ja2VkIjpmYWxzZSwiYWN0aXZlIjp0cnVlLCJsZXZlbCI6bnVsbCwibWFuYWdlcklkIjpudWxsLCJpc0N1cnJlbnRNYW5hZ2VyIjpudWxsLCJjcmVhdGVkQnkiOjM1OCwiY3JlYXRlZE9uIjoxNjkzODk3NzQzMzM4LCJtb2RpZmllZEJ5IjozNTgsIm1vZGlmaWVkT24iOjE2OTM4OTc3NDMzMzgsImxvY2F0aW9uIjpudWxsLCJ6aXBDb2RlIjpudWxsLCJwcm9maWxlUGljdHVyZSI6bnVsbCwiaWF0IjoxNzU4ODA1NzEwLCJleHAiOjE3OTAzNDE3MTB9.DyZMb8cB103xgMDaVXKPce3M5pGufL73eb47HsUuevI";

const getPeopleTechJobs = async (
  apiUrl
) => {
  const response =
    await axios.get(
      apiUrl,
      {
        headers: {
          token: TOKEN,
          Accept:
            "application/json, text/plain, */*",
          Origin:
            "https://peopletech.com",
          Referer:
            "https://peopletech.com/",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/149.0.0.0 Safari/537.36",
        },

        httpsAgent:
          new https.Agent({
            rejectUnauthorized:
              false,
          }),
      }
    );


  return (
    response.data?.data ||
    response.data ||
    []
  );
};

export default getPeopleTechJobs;
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

