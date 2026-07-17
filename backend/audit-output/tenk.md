
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

- **Collector:** TENK
- **Generated:** 18/7/2026, 12:45:57 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\tenkCollector.js
============================================================

```javascript
import get10kCodersJobs
  from "../utils/tenkCoders.js";

const collect10kCodersJobs =
  async (company) => {

    
    const jobs =
      await get10kCodersJobs();


    return jobs.map((job) => ({

      title:
        job.title,

      company:
        company._id,

      location:
        job.location ||
        "Not Specified",

      source:
        "10KCODERS",

      externalJobId:
        String(job.id),

      jobUrl:
        job.external_apply_url,

      description:
        job.description || "",

      jobType:
        job.job_type || "",

      experience:
        job.experience_level || "",

      postedDate:
  job.posted_at
    ? new Date(job.posted_at)
    : null,

    }));
  };

export default collect10kCodersJobs;
```


============================================================
FILE: src\utils\tenkCoders.js
============================================================

```javascript
import axios from "axios";

const get10kCodersJobs = async () => {

  let page = 1;

  const allJobs = [];

  while (true) {

    const response =
      await axios.get(
        "https://10kcoders.com/api/student/jobs/",
        {
          params: {
            student_id: 5961,
            view: "open",
            page,
            page_size: 12,
          },
        }
      );

    const jobs =
      response.data?.data?.items || [];

    

    if (jobs.length === 0) {
      break;
    }

    allJobs.push(...jobs);

    if (
      !response.data?.data?.has_more
    ) {
      break;
    }

    page++;
  }

  return allJobs;
};

export default get10kCodersJobs;
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

