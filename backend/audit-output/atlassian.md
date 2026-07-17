
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

- **Collector:** ATLASSIAN
- **Generated:** 18/7/2026, 12:45:00 am
- **Files Included:** 1

---

# Source Code


============================================================
FILE: src\collectors\atlassianCollector.js
============================================================

```javascript
import axios from "axios";

async function collectAtlassianJobs(company) {
  const response = await axios.get(
    "https://www.atlassian.com/endpoint/careers/listings"
  );

  const relevantJobs = response.data.filter(
    (job) =>
      ["Engineering", "Analytics & Data Science", "Interns"].includes(
        job.category
      )
  );
 
return relevantJobs.map((job) => ({

  title: job.title,

  company: company._id,

  location:
    job.locations?.join(", ") ||
    "Not Specified",

  source: "CUSTOM",

  externalJobId:
    String(job.id),

  jobUrl:
    job.applyUrl,

  description: [
    job.overview,
    job.responsibilities,
    job.qualifications,
  ]
    .filter(Boolean)
    .join("\n\n"),

  jobType:
    job.type || "",

  department:
    job.category || "",

  workplace:
    job.locations?.some(l =>
      l.toLowerCase().includes("remote")
    )
      ? "HYBRID"
      : "ONSITE",

  postedDate:
    job.portalJobPost?.updatedDate
      ? new Date(job.portalJobPost.updatedDate)
      : null,
}));
}



export default collectAtlassianJobs;
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

