
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

- **Collector:** DETAILS
- **Generated:** 18/7/2026, 12:45:14 am
- **Files Included:** 7

---

# Source Code


============================================================
FILE: src\collectors\details\detailFetchers.js
============================================================

```javascript
import fetchWorkdayDetails from "../workday/fetchWorkdayDetails.js";
import fetchOracleDetails from "../oracle/fetchOracleDetails.js";
import fetchAshbyDetails from "../ashby/fetchAshbyDetails.js";
import fetchEightfoldDetails from "../eightfold/fetchEightfoldDetails.js";
import fetchRippleHireDetails
  from "../rippleHire/fetchRippleHireDetails.js";
  import fetchZohoRecruitDetails from "../zoho/fetchZohoRecruitDetails.js";

export default {
  WORKDAY: fetchWorkdayDetails,
  ORACLE: fetchOracleDetails,
  ASHBY: fetchAshbyDetails,
  EIGHTFOLD: fetchEightfoldDetails,
  RIPPLEHIRE:
  fetchRippleHireDetails,
  ZOHO_RECRUIT: fetchZohoRecruitDetails,
};
```


============================================================
FILE: src\collectors\workday\fetchWorkdayDetails.js
============================================================

```javascript
import axios from "axios";

const fetchWorkdayDetails = async (
  job,
  company
) => {

  try {

    const response =
      await axios.get(job.detailUrl, {
        timeout: 20000,
      });
    


const start = Date.now();

    const info =
      response.data.jobPostingInfo;

    return {
      description:
        info.jobDescription || "",

      jobType:
        info.timeType || job.jobType,

      primaryLocation:
        info.location || job.primaryLocation,

      secondaryLocations:
        info.additionalLocations || [],

      hasMultipleLocations:
        (info.additionalLocations?.length || 0) > 0,
    };

  } catch (error) {

  

  return {};
}
};

export default fetchWorkdayDetails;
```


============================================================
FILE: src\collectors\oracle\fetchOracleDetails.js
============================================================

```javascript
import axios from "axios";

const fetchOracleDetails = async (
  job,
  company
) => {

  try {

    const response =
      await axios.get(
        job.detailUrl,
        {
          timeout: 20000,
        }
      );

    const item =
      response.data.items?.[0];

    if (!item) {
      return {};
    }

    return {

      description:
        item.ExternalDescriptionStr || "",

      jobType:
        item.JobSchedule || job.jobType,

      primaryLocation:
        item.PrimaryLocation ||
        job.primaryLocation,

    secondaryLocations:
  (item.secondaryLocations || [])
    .map(location => location.Name)
    .filter(Boolean),
      hasMultipleLocations:
        (item.secondaryLocations?.length || 0) > 0,

    };

  } catch (error) {

    return {};

  }

};

export default fetchOracleDetails;
```


============================================================
FILE: src\collectors\ashby\fetchAshbyDetails.js
============================================================

```javascript
import axios from "axios";

const query = `
query ApiJobPosting(
  $organizationHostedJobsPageName: String!,
  $jobPostingId: String!
) {
  jobPosting(
    organizationHostedJobsPageName: $organizationHostedJobsPageName,
    jobPostingId: $jobPostingId
  ) {
    id
    descriptionHtml
    employmentType
    workplaceType
    locationName
    secondaryLocationNames
    compensationTierSummary
  }
}
`;

const fetchAshbyDetails = async (
  job,
  company
) => {
  try {
    const response = await axios.post(
      job.detailUrl,
      {
        operationName:
          "ApiJobPosting",

        variables: {
          organizationHostedJobsPageName:
            company.slug,

          jobPostingId:
            job.externalJobId,
        },

        query,
      },
      {
        headers: {
          "Content-Type":
            "application/json",
        },

        timeout: 20000,
      }
    );

    const item =
      response.data.data?.jobPosting;

    if (!item) {
      return {};
    }

    return {
      description:
        item.descriptionHtml || "",

      jobType:
        item.employmentType || "",

      workplaceType:
        item.workplaceType || "",

      primaryLocation:
        item.locationName || "",

      secondaryLocations:
        item.secondaryLocationNames || [],

      hasMultipleLocations:
        (item.secondaryLocationNames?.length || 0) > 0,

      salary:
        item.compensationTierSummary || "",
    };
  } catch (error) {
    return {};
  }
};

export default fetchAshbyDetails;
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
FILE: src\collectors\rippleHire\fetchRippleHireDetails.js
============================================================

```javascript
import axios from "axios";

const fetchRippleHireDetails =
  async (job) => {

    try {

      const response =
        await axios.get(
          job.detailUrl,
          {
            timeout: 20000,
          }
        );

      const item =
        response.data.jobVO;

      if (!item) {
        return {};
      }

      return {

        description:
          item.jobDesc || "",

        primaryLocation:
          item.locations ||
          item.jobLocation ||
          "",

        secondaryLocations: [],

        hasMultipleLocations:
          false,

        jobType:
          item.jobTypeCustom3 ||
          job.jobType,

      };

    } catch {

      return {};

    }

  };

export default fetchRippleHireDetails;
```


============================================================
FILE: src\collectors\zoho\fetchZohoRecruitDetails.js
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

