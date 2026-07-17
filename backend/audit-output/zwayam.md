
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

- **Collector:** ZWAYAM
- **Generated:** 18/7/2026, 12:46:02 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\zwayam\zwayamCollector.js
============================================================

```javascript
import getZwayamJobs
  from "../../utils/zwayam.js";

const collectZwayamJobs =
  async (company) => {

  

    const jobs =
      await getZwayamJobs(
        company.openPositionsUrl,
        company.companyId,
        company.domain
      );

    return jobs.map(({ _source: job }) => ({
  title:
    job.jobTitle || "Untitled",

  company:
    company._id,

  location:
    job.location ||
    job.city ||
    "Not Specified",

  source:
    "ZWAYAM",

  externalJobId:
    String(job.id),

  jobUrl:
    `https://${company.domain}/${job.jobUrl}?id=${job.id}`,

  description:
    job.shortDescription || "",

  department:
    job.departmentName || "",

  jobType:
    job.jobType === "J"
      ? "Full Time"
      : "",

  experience:
    job.experienceUIField ||
    job.minYrsOfExperience ||
    "",

  postedDate:
    job.createdDate
      ? new Date(job.createdDate)
      : null,

  skills:
    job.jdSkillsKnownList ||
    [],
}));
  };

export default collectZwayamJobs;
```


============================================================
FILE: src\utils\zwayam.js
============================================================

```javascript
import axios from "axios";
import FormData from "form-data";

const getZwayamJobs = async (
  apiUrl,
  companyId,
  domain
) => {
  let start = 0;

  let allJobs = [];

  while (true) {
   

    const form = new FormData();

    form.append(
      "filterCri",
      JSON.stringify({
        paginationStartNo: start,
        selectedCall: "sort",
        sortCriteria: {
          name: "modifiedDate",
          isAscending: false,
        },
        anyOfTheseWords: "",
      })
    );

    form.append("domain", domain);
    form.append("companyId", companyId);

    try {
      const response = await axios.post(
        apiUrl,
        form,
        {
          headers: {
            ...form.getHeaders(),
            Accept:
              "application/json, text/plain, */*",
          Origin: `https://${domain}`,

Referer: `https://${domain}/`,
            "X-Requested-With":
              "XMLHttpRequest",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/149.0.0.0 Safari/537.36",
          },
        }
      );
   
   

const jobs =
  response.data?.data?.data || [];
      if (jobs.length === 0) {
        break;
      }

      allJobs.push(...jobs);

      start += jobs.length;
    } catch (error) {
      

      throw error;
    }
  }

  return allJobs;
};

export default getZwayamJobs;
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

