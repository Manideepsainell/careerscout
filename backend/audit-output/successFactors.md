
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

- **Collector:** SUCCESSFACTORS
- **Generated:** 18/7/2026, 12:45:54 am
- **Files Included:** 3

---

# Source Code


============================================================
FILE: src\collectors\successFactorsCollector.js
============================================================

```javascript
import getSuccessFactorsJobs from "../utils/successFactors.js";
import enrichSuccessFactorsJob from "../utils/enrichSuccessFactorsJob.js";
import pLimit from "p-limit";

const parseSFDate = (str) => {
  if (!str) return null;
  const [m, d, y] = str.split("/").map(Number);
  if (!m || !d || !y) return null;
  const fullYear = y < 100 ? 2000 + y : y;
  return new Date(fullYear, m - 1, d);
};

const extractCountry = (data) =>
  data?.jobLocationCountry?.[0] ||
  data?.custCountryRegion?.[0] ||
  "";

const extractLocationString = (data) =>
  [
    data?.sfstd_jobLocation_obj?.[0],
    data?.custprimecity,
    data?.jobLocationShort?.[0],
    data?.jobLocationState?.[0],
  ]
    .filter(Boolean)
    .join(" ");

const isLikelyIndia = (data) => {
  const country = extractCountry(data);
  const locationStr = extractLocationString(data);

  if (/india/i.test(country)) return true;
  if (/india/i.test(locationStr)) return true;

  // fallback for sparsely-tagged records with no location fields at all
  if (!country && !locationStr && data?.currency?.[0] === "INR") return true;

  return false;
};

const collectSuccessFactorsJobs = async (company) => {
  const baseUrl = new URL(company.openPositionsUrl).origin;

  const jobs = await getSuccessFactorsJobs(
    company.openPositionsUrl,
    company.categoryId ?? 0,
    company.locationFilter || "",
    company.successFactorsConfig?.maxJobs
  );

  const mapped = jobs.map((job) => {
    const data = job.response;
    const postedDate = data?.unifiedStandardStart
      ? parseSFDate(data.unifiedStandardStart)
      : null;

    const country = extractCountry(data);
    const location = extractLocationString(data) || country || "India";

    return {
      title: data?.unifiedStandardTitle,
      company: company._id,
      location,
      country,
      isIndiaGuess: isLikelyIndia(data),
      source: "SUCCESSFACTORS",
      externalJobId: String(data?.id),
      jobUrl: `${baseUrl}/job/${data?.urlTitle}/${data?.id}-en_US`,
      description: "",
      jobType: "Full Time",
      team: data?.custRMKMappingPicklist?.[0] || "",
      postedDate,
    };
  });

  const recencyDays = company.successFactorsConfig?.recencyDays ?? 30;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - recencyDays);
const indiaCount = mapped.filter((j) => j.isIndiaGuess).length;
const recentCount = mapped.filter((j) => {
  return !j.postedDate || j.postedDate >= cutoff;
}).length;


  const filtered = mapped.filter((job) => {
    const isRecent = !job.postedDate || job.postedDate >= cutoff;
    return job.isIndiaGuess && isRecent;
  });

  console.log(
    `SF ${company.name}: ${mapped.length} total -> ${filtered.length} after India+recency filter`
  );

  const limit = pLimit(5);
  const enriched = await Promise.all(
    filtered.map((job) => limit(() => enrichSuccessFactorsJob(job)))
  );

  // strip internal-only field before returning
  return enriched.map(({ isIndiaGuess, ...job }) => job);
};

export default collectSuccessFactorsJobs;
```


============================================================
FILE: src\utils\successFactors.js
============================================================

```javascript
import axios from "axios";

const getSuccessFactorsJobs = async (
  careersUrl,
  categoryId,
  location = "",
  maxJobs
) => {
  let pageNumber = 0;
  let allJobs = [];

  let totalPages = null;
  const pageSize = 10;

  while (true) {
    try {
      
   const response = await axios.post(
  careersUrl,
  {
    locale: "en_US",
    pageNumber,
    sortBy: "postingDate:desc",
    keywords: "",
    location,
    facetFilters: {},
    brand: "",
    categoryId,
    alertId: "",
    rcmCandidateId: "",
    skills: [],
  },{
     headers: { "Content-Type": "application/json" },
  responseType: "text",
  transformResponse: (data) => data,
});


if (pageNumber === 0) {
  console.log(`SF ${careersUrl} status: ${response.status}`);
  console.log(`SF ${careersUrl} first 300 chars:`, response.data.slice(0, 300));
}

const jobs = response.data?.jobSearchResult || [];
      if (totalPages === null) {
        totalPages = Math.ceil(
          (response.data?.totalJobs || 0) /
            pageSize
        );
      }

      if (!jobs.length) {
        break;
      }

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

      if (
        pageNumber >= totalPages - 1
      ) {
        break;
      }

      pageNumber++;
   } catch (error) {
  console.log(`SF fetch error for ${careersUrl}: ${error.response?.status || ''} ${error.message}`);
  break;
}
  }

  return allJobs;
};

export default getSuccessFactorsJobs;
```


============================================================
FILE: src\utils\enrichSuccessFactorsJob.js
============================================================

```javascript
import axios from "axios";
import * as cheerio from "cheerio";

const enrichSuccessFactorsJob = async (job) => {
  try {
    const { data: html } = await axios.get(job.jobUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 15000,
    });

    const $ = cheerio.load(html);
    const description = $('[itemprop="description"]')
      .first()
      .text()
      .replace(/\\r\\n/g, "\n")
      .replace(/\s+/g, " ")
      .trim();

    return { ...job, description };
  } catch (error) {
    console.log(`Enrich failed for ${job.jobUrl}: ${error.message}`);
    return job;
  }
};

export default enrichSuccessFactorsJob;
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

