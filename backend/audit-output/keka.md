
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

- **Collector:** KEKA
- **Generated:** 18/7/2026, 12:45:41 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\kekaCollector.js
============================================================

```javascript
import getKekaJobs
  from "../utils/keka.js";

const collectKekaJobs =
  async (company) => {

   

    const jobs =
  await getKekaJobs(company);

   
   

   return jobs.map((job) => ({
  title: job.title,

  company: company._id,

  location:
    job.jobLocations?.[0]?.name ||
    "Not Specified",

  source: "KEKA",

  department:
    job.departmentName || "",

  externalJobId:
    String(job.id),

  description:
    job.description || "",

  experience:
    job.experience || "",

  jobType:
    String(job.jobType || ""),

  salary:
    job.salaryRangeFormat || "",

  primaryLocation:
    job.jobLocations?.[0]?.name || "",
secondaryLocations:
    job.jobLocations
        ?.slice(1)
        .map(location => location.name) || [],
  hasMultipleLocations:
    (job.jobLocations?.length || 0) > 1,

  jobUrl:
    company.careersUrl,

  postedDate:
    job.publishedOn
      ? new Date(job.publishedOn)
      : null,
}));
  };

export default collectKekaJobs;
```


============================================================
FILE: src\utils\keka.js
============================================================

```javascript
import axios from "axios";

const getKekaJobs = async (
  company
) => {

  // New pattern
  if (company.careersUrl) {

    const response = await axios.get(
      `${company.careersUrl}/api/jobs/default/active`
    );

    return response.data || [];
  }

  // Old pattern
  if (company.companyId) {

    const response = await axios.get(
      `https://hr.keka.com/careers/api/embedjobs/default/active/${company.companyId}`
    );

    return response.data || [];
  }

  return [];
};

export default getKekaJobs;
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

