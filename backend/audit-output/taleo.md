
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

- **Collector:** TALEO
- **Generated:** 18/7/2026, 12:45:56 am
- **Files Included:** 2

---

# Source Code


============================================================
FILE: src\collectors\taleoCollector.js
============================================================

```javascript
import getTaleoJobs
  from "../utils/taleo.js";

const collectTaleoJobs =
  async (company) => {

    console.log(
      `Taleo collector running for ${company.name}`
    );

    const jobs = await getTaleoJobs(
  company.careersUrl,
  company.taleoConfig
);

    console.log(
      `Retrieved ${jobs.length} jobs`
    );

    return jobs.map((job) => ({
      title: job.title,
      company: company._id,
      source: "TALEO",
      location: "India",
      jobUrl: job.url,
    }));
  };

export default collectTaleoJobs;
```


============================================================
FILE: src\utils\taleo.js
============================================================

```javascript
import axios from "axios";
import * as cheerio from "cheerio";

const getTaleoJobs = async (
  careersUrl,
  taleoConfig = {}
) => {
  let currentPage = 1;
  let allJobs = [];
const baseUrl = new URL(careersUrl).origin;

  while (true) {
    const params = {
      headers: {
  "X-Requested-With": "XMLHttpRequest",
  Accept: "*/*",
},
  ActiveFacetID: 0,
  CurrentPage: currentPage,
  RecordsPerPage: 15,
  TotalContentResults: "",
  Distance: 50,
  RadiusUnitType: 0,
  Keywords: "",
  Location: "",
  ShowRadius: "False",
  IsPagination: "False",
  CustomFacetName: "",
  FacetTerm: "",
  FacetType: 0,
  SearchResultsModuleName: "Search Results",
  SearchFiltersModuleName: "Search Filters",
  SortCriteria: 0,
  SortDirection: 0,
  SearchType: taleoConfig.searchType ?? 5,
  PostalCode: "",
  ResultsType: 0,
  fc: "",
  fl: "",
  fcf: "",
  afc: "",
  afl: "",
  afcf: "",
  TotalContentPages: "NaN",
};
    console.log(`Fetching page ${currentPage}`);
(taleoConfig.facetFilters || []).forEach((filter, index) => {
  params[`FacetFilters[${index}].ID`] = filter.ID;
  params[`FacetFilters[${index}].FacetType`] = filter.FacetType;
  params[`FacetFilters[${index}].Display`] = filter.Display;
  params[`FacetFilters[${index}].IsApplied`] = filter.IsApplied;

  if (filter.FieldName) {
    params[`FacetFilters[${index}].FieldName`] = filter.FieldName;
  }
});
    const response = await axios.get(
      `${careersUrl}/search-jobs/results`,
      {
       params,
      }
    );

   const html = response.data.results;
const $ = cheerio.load(html);

    const jobs = [];

    $("a").each((i, el) => {
      const href = $(el).attr("href");

      const rawText = $(el)
        .text()
        .replace(/\s+/g, " ")
        .trim();

      const isIndia =
        rawText.includes("Hyderabad") ||
        rawText.includes("Bangalore") ||
        rawText.includes("Bengaluru") ||
        rawText.includes("Pune") ||
        rawText.includes("Chennai") ||
        rawText.includes("Gurgaon") ||
        rawText.includes("Noida") ||
        rawText.includes("Mumbai") ||
        rawText.includes("India");

      if (
  !href ||
  !href.includes("/job/")
) {
  return;
}

if (!isIndia) {
  return;
}




      jobs.push({
       title: rawText
  .split(/\d{7}/)[0]
  .trim(),
        url: `${baseUrl}${href}`,
      });
    });

    console.log(`Retrieved ${jobs.length} jobs`);

    if (jobs.length === 0) {
      break;
    }

    allJobs.push(...jobs);

    currentPage++;
  }

  return allJobs;
};

export default getTaleoJobs;
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

