
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

- **Collector:** TECHOLUTION
- **Generated:** 18/7/2026, 12:45:56 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\techolutionCollector.js
============================================================

```javascript
import getTecholutionJobs
  from "../utils/techolution.js";

const collectTecholutionJobs =
  async (company) => {


    const jobs =
      await getTecholutionJobs(
        company.openPositionsUrl
      );

  return jobs.map((job) => ({
  title: job.roleName,

  company: company._id,

  location:
    job.locations || "Not Specified",

  source: "TECHOLUTION",

  externalJobId: String(job.id),

  jobUrl:
    `https://hire.techolution.com/careers/${job.id}`,

  description:
    job.roleDescription || "",

  jobType:
    job.employmentType || "Full Time",

  experience:
    job.positionStatus || "",

  skills: [
    ...(job.skills?.foundationalSkills || []),
    ...(job.skills?.advancedSkills || []),
  ],

  postedDate:
    job.createdAt
      ? new Date(job.createdAt)
      : null,
}));
  };

export default collectTecholutionJobs;
```


============================================================
FILE: src\utils\techolution.js
============================================================

```javascript
import axios from "axios";

const getTecholutionJobs = async (
  apiUrl
) => {
  const response =
    await axios.get(apiUrl);

  const categories =
    response.data?.data || [];

  return categories.flatMap(
    (category) =>
      category.roles || []
  );
};

export default getTecholutionJobs;
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

