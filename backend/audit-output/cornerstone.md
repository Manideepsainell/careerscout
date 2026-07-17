
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

- **Collector:** CORNERSTONE
- **Generated:** 18/7/2026, 12:45:07 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\cornerstoneCollector.js
============================================================

```javascript
import { searchJobs }
  from "../utils/cornerstone.js";

const collectCornerstoneJobs =
  async (company) => {

    
    let allJobs = [];
    let pageNumber = 1;

    while (true) {

    const data = await searchJobs({
  apiUrl:
    company.cornerstoneApiUrl ??
    "https://us-galaxy.api.csod.com/rec-job-search/external/jobs",
  careerSiteId: company.careerSiteId,
  careerSitePageId: company.careerSitePageId,
  pageNumber,
});

      const jobs =
        data.requisitions || [];

      if (jobs.length === 0) {
        break;
      }

      allJobs.push(...jobs);

      

      const totalCount =
        data.totalCount || 0;

      if (
        allJobs.length >= totalCount
      ) {
        break;
      }

      pageNumber++;
    }

return allJobs.map((job) => ({

  title:
    job.displayJobTitle,

  company:
    company._id,

  location:
    job.locations
      ?.map(
        (loc) =>
          loc.city ||
          loc.locationName
      )
      .filter(Boolean)
      .join(", ") ||
    "Not Specified",

  source:
    "CORNERSTONE",

  externalJobId:
    String(job.requisitionId),

  jobUrl:
    company.careersUrl,

  description:
    job.externalDescription || "",

  jobType:
    "Full Time",

  department:
    job.jobCategory || "",

  workplace:
    job.externalDescription?.includes("#LI-Onsite")
      ? "ONSITE"
      : job.externalDescription?.toLowerCase().includes("hybrid")
        ? "HYBRID"
        : "",

  postedDate:
    job.postingEffectiveDate
      ? new Date(job.postingEffectiveDate)
      : null,
}));
  };

export default collectCornerstoneJobs;
```


============================================================
FILE: src\utils\cornerstone.js
============================================================

```javascript
import axios from "axios";

export async function searchJobs({
  apiUrl,
  careerSiteId,
  careerSitePageId,
  pageNumber = 1,
}) {
  const token = await getToken();

  const response = await axios.post(
    apiUrl,
    {
      careerSiteId,
      careerSitePageId,

      pageNumber,
      pageSize: 25,

      cultureId: 1,
      cultureName: "en-US",

      searchText: "",

      countryCodes: ["in"],

      postingsWithinDays: 30,

      cities: [],
      states: [],
      placeID: "",

      customFieldCheckboxKeys: [],
      customFieldDropdowns: [],
      customFieldRadios: [],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}

export async function getToken() {
  const response = await axios.get(
    "https://cornerstone.csod.com/ux/ats/careersite/2/home"
  );

  const match = response.data.match(
    /"token":\s*"([^"]+)"/
  );

  return match?.[1];
}
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

