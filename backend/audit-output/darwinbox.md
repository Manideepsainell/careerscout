
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

- **Collector:** DARWINBOX
- **Generated:** 18/7/2026, 12:45:08 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\darwinboxCollector.js
============================================================

```javascript
import getDarwinboxJobs from "../utils/darwinbox.js";

const collectDarwinboxJobs = async (company) => {
  const jobs = await getDarwinboxJobs(
    company.openPositionsUrl
  );

  return jobs.map((job) => ({
    title: job.title,

    company: company._id,

    location:
      job.officelocations_without_area?.[0] ||
      job.locations ||
      "Not Specified",

    source: "DARWINBOX",

    externalJobId: String(job.id),

    description: job.jd || "",

    experience: job.experience || "",

    postedDate: job.posted_on
      ? new Date(job.posted_on)
      : null,

    jobType:
      job.emp_type_name ||
      job.emp_type ||
      "",

    department:
      job.department_name_only ||
      job.department_name ||
      "",

    workplace: job.is_remote
      ? "REMOTE"
      : "ONSITE",
  }));
};

export default collectDarwinboxJobs;
```


============================================================
FILE: src\utils\darwinbox.js
============================================================

```javascript
import { chromium } from "playwright";

const getDarwinboxJobs = async (
  openPositionsUrl,
  companyId = "main"
) => {
  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const page = await browser.newPage();

    await page.goto(openPositionsUrl, {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    const result = await page.evaluate(
      async ({ companyId }) => {
        const limit = 10;
        let currentPage = 1;
        let allJobs = [];

        while (true) {
          const response = await fetch(
            `/ms/candidateapi/job/alljobs?companyId=${companyId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                companyId,
                page: currentPage,
                sort_option: "new",
                limit,
              }),
            }
          );

          const data = await response.json();

          const jobs = data.data || [];

          if (!jobs.length) {
            break;
          }

          allJobs.push(...jobs);

          const totalPages = Math.ceil(
            (data.job_counts || 0) / limit
          );

          if (currentPage >= totalPages) {
            break;
          }

          currentPage++;
        }

        return allJobs;
      },
      { companyId }
    );

    return result;
  } finally {
    await browser.close();
  }
};

export default getDarwinboxJobs;
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

