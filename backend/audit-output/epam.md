
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

- **Collector:** EPAM
- **Generated:** 18/7/2026, 12:45:21 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\epamCollector.js
============================================================

```javascript
import getEpamJobs
  from "../utils/epam.js";

const collectEpamJobs =
  async (company) => {

    

    const jobs =
      await getEpamJobs();


   return jobs.map((job) => ({
  title: job.name,

  company: company._id,

  location:
    (job.city || [])
      .map(c => c.name)
      .join(", ") ||
    "Not Specified",

  source: "EPAM",

  externalJobId: String(
    job.unique_id || job.uid
  ),

  jobUrl:
    `https://careers.epam.com${job.seo?.url}`,

  description:
    job.description || "",

  jobType:
    job.posting_type || "Full Time",

  department:
    job.job_specialization?.[0] ||
    "",

  experience:
    job.seniority || "",

  team:
    job.primary_skill || "",

  workplace:
    job.vacancy_type || "",

  postedDate:
    job.created_at
      ? new Date(job.created_at)
      : null,
}));
  };

export default collectEpamJobs;
```


============================================================
FILE: src\utils\epam.js
============================================================

```javascript
import axios from "axios";

const getEpamJobs = async () => {
  let from = 0;

  const size = 10;

  let allJobs = [];

  while (true) {
    const response =
      await axios.get(
        "https://careers.epam.com/api/jobs/v2/search/careers-i18n",
        {
         params: {
  facets: "country=4060741400035606931",
  from,
  lang: "en",
  size,
  sortBy: "relevance;relocation=asc",
  websiteLocale: "en-us",
}
        }
      );


const jobs =
  response.data?.data?.jobs || [];

    

    if (jobs.length === 0) {
      break;
    }

    allJobs.push(...jobs);

    from += size;
  }

return allJobs;
 
};

export default getEpamJobs;
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

