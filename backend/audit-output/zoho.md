
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

- **Collector:** ZOHO
- **Generated:** 18/7/2026, 12:46:01 am
- **Files Included:** 3

---

# Source Code


============================================================
FILE: src\collectors\zoho\fetchzohoRecruitDetails.js
============================================================

```javascript
import axios from "axios";

const fetchZohoRecruitDetails = async (job) => {

  if (!job.jobUrl) {
    return {};
  }

  const response = await axios.get(job.jobUrl);

  const html = response.data;

  const match = html.match(
    /var jobs = JSON\.parse\('([\s\S]*?)'\);/
  );

  if (!match) return {};

  const encoded = match[1];

  const decoded = Function(`return '${encoded}'`)();

  const [data] = JSON.parse(decoded);

  return {
    description: data.Job_Description || "",

    experience: data.Work_Experience || "",

    jobType: data.Job_Type || "",

    department:
      data.Department_Name?.name || "",

    workplace:
      data.Remote_Job ? "REMOTE" : "ONSITE",

    postedDate:
      data.Date_Opened
        ? new Date(data.Date_Opened)
        : null,
  };
};

export default fetchZohoRecruitDetails;
```


============================================================
FILE: src\collectors\zoho\zohoRecruitCollector.js
============================================================

```javascript
import getZohoRecruitJobs from "../../utils/zohoRecruit.js";

const collectZohoRecruitJobs =
  async (company) => {
   

    const jobs =
      await getZohoRecruitJobs(
        company.openPositionsUrl
      );



   return jobs.map((job) => ({
    
  title:
    job.Posting_Title,

  company:
    company._id,

  location:
    [
      job.City,
      job.State,
      job.Country,
    ]
      .filter(Boolean)
      .join(", ") ||
    "Not Specified",

  source:
    "ZOHO_RECRUIT",

  externalJobId:
    job.id,

  jobUrl:
    job.$url,

  description:
    job.Job_Description || "",

  jobType:
    job.Job_Type || "",

  postedDate:
    job.Date_Opened
      ? new Date(job.Date_Opened)
      : null,
}));
  };

export default collectZohoRecruitJobs;
```


============================================================
FILE: src\utils\zohoRecruit.js
============================================================

```javascript
import axios from "axios";
import * as cheerio from "cheerio";

const getZohoRecruitJobs = async (apiUrl) => {

  // Try API first
  const response = await axios.get(apiUrl, {
    params: {
      pagename: "Careers",
      source: "CareerSite",
      extra_fields: JSON.stringify(["Remote_Job"]),
    },
  });

  if (response.data?.data?.length) {
    return response.data.data;
  }

  // Fallback to HTML
  const html = (await axios.get(apiUrl)).data;

  const $ = cheerio.load(html);

  const encoded = $("#jobs").attr("value");

  if (!encoded) {
    return [];
  }

  const decoded = encoded
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  return JSON.parse(decoded);
};

export default getZohoRecruitJobs;
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

