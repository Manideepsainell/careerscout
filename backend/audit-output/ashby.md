
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

- **Collector:** ASHBY
- **Generated:** 18/7/2026, 12:44:54 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\ashby\ashbyCollector.js
============================================================

```javascript
import axios from "axios";

const query = `
query ApiJobBoardWithTeams(
  $organizationHostedJobsPageName: String!
) {
  jobBoard: jobBoardWithTeams(
    organizationHostedJobsPageName: $organizationHostedJobsPageName
  ) {
    jobPostings {
      id
      title
      locationName
    }
  }
}
`;

const collectAshbyJobs = async (company) => {
  const slug = company.slug;

  try {
    const response = await axios.post(
      company.openPositionsUrl,
      {
        operationName: "ApiJobBoardWithTeams",

        variables: {
          organizationHostedJobsPageName: slug,
        },

        query,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    const jobs =
      response.data.data?.jobBoard?.jobPostings || [];

   const maxJobs =
  company.ashbyConfig?.maxJobs;

const collectedJobs = maxJobs
  ? jobs.slice(0, maxJobs)
  : jobs;

return collectedJobs.map((job) => ({
  title: job.title,

  company: company._id,

  location:
    job.locationName ||
    "Not Specified",

  source: "ASHBY",

  externalJobId: job.id,

  jobUrl: `https://jobs.ashbyhq.com/${slug}/${job.id}`,

  detailUrl:
    "https://jobs.ashbyhq.com/api/non-user-graphql",

  description: "",

  postedDate: null,
}));

  } catch (error) {

    if (error.response?.status === 429) {
      console.log(
        `Ashby rate limited: ${company.name}`
      );
      return [];
    }

    throw error;
  }
};

export default collectAshbyJobs;
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

