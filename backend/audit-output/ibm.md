
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

- **Collector:** IBM
- **Generated:** 18/7/2026, 12:45:32 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\ibmCollector.js
============================================================

```javascript
import getIbmJobs
  from "../utils/ibm.js";

const collectIbmJobs =
  async (company) => {

    const jobs =
      await getIbmJobs(
        company.openPositionsUrl
      );

  

    return jobs.map((job) => {

      const data =
        job._source || {};

      const jobId =
        data.url?.match(
          /jobId=(\d+)/
        )?.[1];
return {
  title: data.title,

  company: company._id,

  location:
    data.field_keyword_19 ||
    "Not Specified",

  department:
    data.field_keyword_08 ||
    "",

  workplace:
    data.field_keyword_17 ||
    "",

  experience:
    data.field_keyword_18 ||
    "",

  postedDate: data.dcdate
    ? new Date(data.dcdate)
    : null,

  source: "IBM",

  externalJobId: String(
    jobId || data.url
  ),

  jobUrl: data.url,

  description:
    data.description || "",

  jobType: "Full Time",
};
    });
  };

export default collectIbmJobs;
```


============================================================
FILE: src\utils\ibm.js
============================================================

```javascript
import axios from "axios";

const getIbmJobs = async (careersUrl) => {
  try {
    let from = 0;
    const size = 100;

    let allJobs = [];

    while (true) {
      const response = await axios.post(careersUrl, {
        appId: "careers",

        scopes: ["careers2"],

        size,
        from,

        lang: "zz",

        sm: {
          query: "",
          lang: "zz",
        },

        query: {
          bool: {
            must: [],
          },
        },

        sort: [
          { dcdate: "desc" },
          { _score: "desc" },
        ],

        _source: [
          "_id",
          "title",
          "url",
          "description",
          "language",
          "entitled",
          "field_keyword_17",
          "field_keyword_08",
          "field_keyword_18",
          "field_keyword_19",
          "dcdate",
        ],
      });

      const jobs =
        response.data?.hits?.hits || [];

      const totalJobs =
        response.data?.hits?.total?.value || 0;

      if (!jobs.length) {
        break;
      }

      allJobs.push(...jobs);

     

      if (
        allJobs.length >= totalJobs
      ) {
        break;
      }

      from += size;
    }

    return allJobs;

  } catch (error) {

   

    throw error;
  }
};

export default getIbmJobs;
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

