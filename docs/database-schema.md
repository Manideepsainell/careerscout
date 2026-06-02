# CareerScout Database Schema

## Collections

1. UserProfile
2. Company
3. RawJob
4. Job
5. Score
6. Application
7. InterviewHistory

---

# UserProfile

```js
{
  _id,

  name,

  experienceLevel,

  preferredRoles: [],

  preferredSkills: [],

  preferredLocations: [],

  preferredCategories: [],

  targetCompanies: [],

  rejectedRoles: [],

  createdAt,

  updatedAt
}
```

Required Fields:

- name
- experienceLevel

---

# Company

```js
{
  _id,

  name,

  website,

  careersUrl,

  category,

  size,

  location,

  active,

  crawlStatus,

  lastCrawledAt,

  lastSuccessAt,

  createdAt,

  updatedAt
}
```

Required Fields:

- name
- careersUrl
- category

Category Values:

- Startup
- Product
- SaaS
- Service
- Enterprise

---

# RawJob

```js
{
  _id,

  companyId,

  source,

  sourceUrl,

  rawHtml,

  rawText,

  crawledAt
}
```

Required Fields:

- companyId
- source
- crawledAt

Purpose:

Store raw crawled data before normalization.

---

# Job

```js
{
  _id,

  companyId,

  source,

  title,

  location,

  isRemote,

  experienceMin,

  experienceMax,

  employmentType,

  description,

  rawSkills: [],

  normalizedSkills: [],

  jobUrl,

  postedDate,

  status,

  createdAt,

  updatedAt
}
```

Required Fields:

- companyId
- source
- title
- jobUrl

Status Values:

- ACTIVE
- EXPIRED
- FILLED

---

# Score

```js
{
  _id,

  jobId,

  overallScore,

  verdict,

  confidence,

  reasons: [],

  calculatedAt
}
```

Required Fields:

- jobId
- overallScore

Verdict Values:

- MUST_APPLY
- APPLY
- MAYBE
- SKIP

Confidence Values:

- HIGH
- MEDIUM
- LOW

---

# Application

```js
{
  _id,

  jobId,

  platform,

  appliedDate,

  status,

  notes
}
```

Required Fields:

- jobId
- status

Status Values:

- SAVED
- APPLIED
- OA
- INTERVIEW
- REJECTED
- OFFER
- GHOSTED

---

# InterviewHistory

```js
{
  _id,

  company,

  role,

  source,

  stageReached,

  outcome,

  notes,

  interviewDate
}
```

Required Fields:

- company
- role

Examples:

- Workelate
- CraftNotion
- Plume

---

# Supported Sources

- CAREER_PAGE
- WELLFOUND
- YC_JOBS
- LINKEDIN
- NAUKRI
- INDEED
- MANUAL