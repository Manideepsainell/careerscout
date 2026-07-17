
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

- **Collector:** ACCENTURE
- **Generated:** 18/7/2026, 12:44:49 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\accentureCollector.js
============================================================

```javascript
import getAccentureJobs
  from "../utils/accenture.js";

const collectAccentureJobs =
  async (company) => {


    const jobs =
      await getAccentureJobs(
        company.openPositionsUrl
      );

 return jobs.map((job) => ({
  title: job.title,

  company: company._id,

  location:
    job.feedCity ||
    "Not Specified",

  source: "ACCENTURE",

  externalJobId: String(
    job.requisitionId ||
    job.guid
  ),

  jobUrl: job.jobDetailUrl
    ? job.jobDetailUrl.replace("{0}", "in-en")
    : "",

  description:
    job.jobDescriptionClean ||
    job.jobDescription ||
    "",

  jobType:
    job.employeeType ||
    "Full Time",

  postedDate: job.updateDate
    ? new Date(job.updateDate)
    : null,

  // ---------- Intelligence ----------

  department:
    job.function?.[0] ||
    "",

  team:
    job.businessArea ||
    "",

  workplace:
    job.remoteType
      ? job.remoteType.toUpperCase()
      : "",

  experience:
    job.yearsOfExperience ||
    "",

  salary: "",
}));
  };

export default collectAccentureJobs;
```


============================================================
FILE: src\utils\accenture.js
============================================================

```javascript
import axios from "axios";
import FormData from "form-data";
const getAccentureJobs = async (
  careersUrl
) => {

  let startIndex = 0;

  const pageSize = 12;

  let allJobs = [];
let totalJobs = null;
  while (true) {


   const formData = new FormData();

formData.append(
  "startIndex",
  startIndex
);

formData.append(
  "maxResultSize",
  pageSize
);

formData.append(
  "jobKeyword",
  ""
);

formData.append(
  "jobCountry",
  "India"
);

formData.append(
  "jobLanguage",
  "en"
);

formData.append(
  "countrySite",
  "in-en"
);

formData.append(
  "sortBy",
  "2"
);

formData.append(
  "searchType",
  "vectorSearch"
);

formData.append(
  "enableQueryBoost",
  "true"
);

formData.append(
  "minScore",
  "0.6"
);

formData.append(
  "getFeedbackJudgmentEnabled",
  "true"
);

formData.append(
  "useCleanEmbedding",
  "true"
);

formData.append(
  "score",
  "true"
);

formData.append(
  "totalHits",
  "true"
);

formData.append(
  "debugQuery",
  "false"
);

formData.append(
  "jobFilters",
  ""
);

try{
const response =
  await axios.post(
    careersUrl,
    formData,
    {
      headers:
        formData.getHeaders(),
    }
  );
    const jobs =
      response.data?.data || [];

    const totalJobs =
      response.data?.totalHits?.total;

  
    allJobs.push(...jobs);

if (
  totalJobs &&
  allJobs.length >= totalJobs
) {
  break;
}

if (
  allJobs.length >= 1000
) {
  break;
}
  }
  catch (error) {
   
    throw error;
}

  if (allJobs.length >= totalJobs) {
  break;
}

    startIndex += pageSize;

    await new Promise(resolve =>
      setTimeout(resolve, 500)
    );
  }

  return allJobs;
};

export default getAccentureJobs;
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

