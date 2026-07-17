
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

- **Collector:** ORACLE
- **Generated:** 18/7/2026, 12:45:48 am
- **Files Included:** 3

---

# Source Code


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
FILE: src\collectors\oracle\oracleCollector.js
============================================================

```javascript
import axios from "axios";

import {
  buildOracleJobsEndpoint,
  buildOracleDetailUrl,
} from "../../utils/oracle.js";
const collectOracleJobs = async (
  company
) => {
  let offset = 0;
  let allJobs = [];

  while (true) {
    
    const endpoint =
      buildOracleJobsEndpoint(
        company,
        offset
      );

    const response =
      await axios.get(endpoint);

    const search =
      response.data.items?.[0];

    const jobs =
      search?.requisitionList || [];

    if (!jobs.length) {
      break;
    }
  
    const maxJobs =
      company.oracleConfig?.maxJobs;

    if (maxJobs) {
      const remaining =
        maxJobs - allJobs.length;

      allJobs.push(
        ...jobs.slice(0, remaining)
      );

      if (
        allJobs.length >= maxJobs
      ) {
        break;
      }
    } else {
      allJobs.push(...jobs);
    }

    const totalJobs =
      search.TotalJobsCount || 0;

    const limit =
      search.Limit || 25;

    offset += limit;

    if (offset >= totalJobs) {
      break;
    }
  }

  const parsed = new URL(
    company.openPositionsUrl
  );

  const siteName =
    parsed.pathname.split("/")[5];


  return allJobs.map((job) => ({
    title: job.Title,
    company: company._id,

    location:
      job.PrimaryLocation ||
      "Not Specified",

    source: "ORACLE",

    externalJobId: job.Id,

    jobUrl: `${parsed.origin}/hcmUI/CandidateExperience/en/sites/${siteName}/job/${job.Id}`,
detailUrl: buildOracleDetailUrl(
  company,
  job.Id
),
    description:
      job.ShortDescriptionStr || "",

    postedDate: job.PostedDate
      ? new Date(job.PostedDate)
      : null,
  }));
};

export default collectOracleJobs;
```


============================================================
FILE: src\utils\oracle.js
============================================================

```javascript
const extractSiteNumber = (
  openPositionsUrl
) => {
  const match =
    openPositionsUrl.match(
      /\/sites\/([^/]+)\//
    );

  return match?.[1];
};

const buildOracleJobsEndpoint = (
  company,
  offset = 0
) => {
  const config =
    company.oracleConfig || {};

  const siteNumber =
    config.siteNumber ||
    extractSiteNumber(
      company.openPositionsUrl
    );

  const parsed =
    new URL(
      company.openPositionsUrl
    );

  const finderParams = [
    `siteNumber=${siteNumber}`,
    `limit=${config.limit ?? 25}`,
    `offset=${offset}`,
  ];

  if (config.keyword) {
    finderParams.push(
      `keyword="${config.keyword}"`
    );
  }

  if (config.locationId) {
    finderParams.push(
      `locationId=${config.locationId}`
    );
  }

  if (
    config.selectedLocationsFacet
  ) {
    finderParams.push(
      `selectedLocationsFacet=${config.selectedLocationsFacet}`
    );
  }

  if (config.radius) {
    finderParams.push(
      `radius=${config.radius}`
    );
  }

  if (config.radiusUnit) {
    finderParams.push(
      `radiusUnit=${config.radiusUnit}`
    );
  }

  if (
    config.lastSelectedFacet
  ) {
    finderParams.push(
      `lastSelectedFacet=${config.lastSelectedFacet}`
    );
  }

  if (
    config.selectedPostingDatesFacet
  ) {
    finderParams.push(
      `selectedPostingDatesFacet=${config.selectedPostingDatesFacet}`
    );
  }

  if (
    config.selectedFlexFieldsFacets
  ) {
    finderParams.push(
      `selectedFlexFieldsFacets=${config.selectedFlexFieldsFacets}`
    );
  }

  finderParams.push(
    `sortBy=${
      config.sortBy ||
      "POSTING_DATES_DESC"
    }`
  );

  return `${parsed.origin}/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.workLocation,requisitionList.otherWorkLocations,requisitionList.secondaryLocations,flexFieldsFacet.values,requisitionList.requisitionFlexFields&finder=findReqs;facetsList=LOCATIONS%3BWORK_LOCATIONS%3BWORKPLACE_TYPES%3BTITLES%3BCATEGORIES%3BORGANIZATIONS%3BPOSTING_DATES%3BFLEX_FIELDS,${finderParams.join(",")}`;
};
const buildOracleDetailUrl = (
  company,
  jobId
) => {

  const parsed =
    new URL(
      company.openPositionsUrl
    );

  const siteNumber =
    company.oracleConfig?.siteNumber ||
    extractSiteNumber(
      company.openPositionsUrl
    );

  return `${parsed.origin}/hcmRestApi/resources/latest/recruitingCEJobRequisitionDetails?expand=all&onlyData=true&finder=ById;Id="${jobId}",siteNumber=${siteNumber}`;
};
export {
  extractSiteNumber,
  buildOracleJobsEndpoint,
  buildOracleDetailUrl,
};
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

