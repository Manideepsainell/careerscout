
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

- **Collector:** CAPGEMINI
- **Generated:** 18/7/2026, 12:45:03 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\capgeminiCollector.js
============================================================

```javascript
import getCapgeminiJobs
  from "../utils/capgemini.js";

const collectCapgeminiJobs =
  async (company) => {

    const jobs =
      await getCapgeminiJobs(
        company.openPositionsUrl
      );

   
return jobs.map((job) => ({
  title: job.title,

  company: company._id,

  location:
    job.location ||
    "India",

  source: "CAPGEMINI",

  externalJobId: String(job.id),

  jobUrl:
    job.apply_job_url ||
    company.careersUrl,

  description:
    job.description || "",

  jobType:
    job.contract_type ||
    "Full Time",

  postedDate: job.updated_at
    ? new Date(job.updated_at)
    : null,

  // ---------- Intelligence ----------

  department:
    job.professional_communities ||
    job.department ||
    "",

  team:
    job.sbu ||
    "",

  experience:
    job.experience_level ||
    "",

  educationLevel:
    job.education_level ||
    "",
}));
  };

export default collectCapgeminiJobs;
```


============================================================
FILE: src\utils\capgemini.js
============================================================

```javascript
import axios from "axios";

const getCapgeminiJobs = async (
  careersUrl
) => {
const pageSize=11;
  let page = pageSize;

  let allJobs = [];

let totalJobs = null;

while (true) {

  const response =
    await axios.get(
      careersUrl,
      {
        params: {
          country_code: "in-en",
          page,
          size: pageSize,
        },
      }
    );

  const jobs =
    response.data?.data || [];

  if (totalJobs === null) {
    totalJobs =
      response.data?.total ??
      response.data?.count;
  }

  if (!jobs.length) {
    break;
  }

  allJobs.push(...jobs);

  if (
    totalJobs &&
    allJobs.length >= totalJobs
  ) {
    break;
  }

  if (jobs.length < pageSize) {
    break;
  }

  page++;
}

  return allJobs;
};

export default getCapgeminiJobs;
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

