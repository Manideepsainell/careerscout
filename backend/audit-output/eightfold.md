
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

- **Collector:** EIGHTFOLD
- **Generated:** 18/7/2026, 12:45:19 am
- **Files Included:** 3

---

# Source Code


============================================================
FILE: src\collectors\eightfold\eightfoldCollector.js
============================================================

```javascript
import {
  searchJobs,
} from "../../utils/eightfold.js";


const collectEightfoldJobs = async (
  company
) => {

  let allPositions = [];
  let start = 0;

  const baseUrl =
    company.careersUrl
      ? new URL(
          company.careersUrl
        ).origin
      : `https://${company.domain.split(".")[0]}.eightfold.ai`;

  while (true) {

   const data =
  await searchJobs({
    baseUrl,
    domain: company.domain,
    start,
  });


const positions =
  data?.positions || [];
    if (!positions.length) {
      break;
    }

   const maxJobs =
  company.eightfoldConfig?.maxJobs;

if (maxJobs) {
  const remaining =
    maxJobs - allPositions.length;

  allPositions.push(
    ...positions.slice(0, remaining)
  );

  if (allPositions.length >= maxJobs) {
    break;
  }
} else {
  allPositions.push(...positions);
}

    start += 10;
  }


  return allPositions.map(
    (job) => ({
      title: job.name,
      company: company._id,

      location:
        job.locations?.join(", ") ||
        "Not Specified",

      source: "EIGHTFOLD",

      externalJobId:
        String(job.id),

      jobUrl:
        `${baseUrl}${job.positionUrl}`,

      detailUrl:
        `${baseUrl}/api/pcsx/position_details?position_id=${job.id}&domain=${company.domain}&hl=en`,

      description: "",

      postedDate:
        job.postedTs
          ? new Date(job.postedTs * 1000)
          : null,
    })
  );
};

export default collectEightfoldJobs;
```


============================================================
FILE: src\collectors\eightfold\fetchEightfoldDetails.js
============================================================

```javascript
import axios from "axios";

const fetchEightfoldDetails =
  async (job) => {

    try {

      const response =
        await axios.get(
          job.detailUrl,
          {
            timeout: 30000,
          }
        );

      const item =
        response.data.data;

      if (!item) {
        return {};
      }

      return {
  description:
    item.jobDescription || "",

  department:
    item.department || "",

  jobType:
    item.workLocationOption || "",

  primaryLocation:
    item.location || "",

  secondaryLocations:
    item.locations?.slice(1) || [],

  hasMultipleLocations:
    (item.locations?.length || 0) > 1,
};

    } catch {

      return {};

    }

  };

export default fetchEightfoldDetails;
```


============================================================
FILE: src\utils\eightfold.js
============================================================

```javascript
import axios from "axios";
import https from "https";
const agent = new https.Agent({
  family: 4,
});
export async function searchJobs({
  baseUrl,
  domain,
  start = 0,
}) {
  try {
 const response = await axios.get(
  `${baseUrl}/api/pcsx/search`,
  {
    httpsAgent: agent,
    timeout: 30000,
    params: {
      domain,
      query: "",
      location: "",
      start,
      sort_by: "timestamp",
    },
  }
);



    return response.data.data;

  } catch (error) {
    if (error.response?.status === 403) {
      console.log(`403 blocked: ${domain}`);
      return { positions: [] };
    }

    throw error;
  }
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

