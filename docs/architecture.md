# CareerScout Architecture

## System Goal

CareerScout collects jobs from multiple sources, normalizes data, scores opportunities, and presents the highest-value jobs to the user.

---

# High Level Architecture

```text
Sources
   ↓
Collectors
   ↓
Raw Jobs
   ↓
Normalizer
   ↓
Jobs
   ↓
Scoring Engine
   ↓
Scores
   ↓
Dashboard
```

---

# Architecture Components

## 1. Sources

Job sources used by CareerScout.

Supported Sources:

- Company Career Pages
- Wellfound
- YC Jobs
- LinkedIn
- Naukri
- Indeed
- Manual Entry

Purpose:

Provide raw job data.

---

## 2. Collectors

Responsible for fetching job data from sources.

Examples:

- GenericCareerCollector
- WellfoundCollector
- YCJobsCollector
- LinkedInCollector
- NaukriCollector
- IndeedCollector

Output:

Raw job information.

---

## 3. Raw Jobs Layer

Stores unprocessed data.

Collection:

rawJobs

Purpose:

- Preserve original data
- Support debugging
- Allow re-processing without re-crawling

---

## 4. Normalizer

Converts raw data into a standard format.

Examples:

### Skills

Before:

```text
Node JS
Node.js
NodeJS
```

After:

```text
nodejs
```

### Experience

Before:

```text
0-2 years
```

After:

```json
{
  "min": 0,
  "max": 2
}
```

### Location

Before:

```text
Remote India
WFH
Work From Home
```

After:

```json
{
  "isRemote": true
}
```

Output:

Normalized Job records.

---

## 5. Duplicate Detector

Purpose:

Prevent duplicate job listings.

Example:

Same role appears on:

- LinkedIn
- Naukri
- Indeed
- Company Career Page

Result:

Store only one canonical job record.

---

## 6. Scoring Engine

Calculates relevance score.

Inputs:

- Job Data
- User Profile
- Interview History

Outputs:

- Score
- Verdict
- Confidence
- Reasons

Verdicts:

- MUST_APPLY
- APPLY
- MAYBE
- SKIP

---

## 7. Dashboard

Main user interface.

Displays:

### Must Apply

Highest priority opportunities.

### Apply

Strong opportunities.

### Maybe

Review manually.

### Skip

Low relevance opportunities.

Purpose:

Reduce job-search time and improve decision making.

---

# Data Flow

```text
Source
   ↓
Collector
   ↓
RawJob
   ↓
Normalizer
   ↓
Job
   ↓
Duplicate Detector
   ↓
Scoring Engine
   ↓
Score
   ↓
Dashboard
```

---

# Technology Stack

## Backend

- Node.js
- Express

## Database

- MongoDB

## Crawling

- Playwright

## AI

- Gemini

## Frontend

- React

---

# Design Principles

1. User-first scoring

CareerScout optimizes for the user's goals, not generic job recommendations.

2. Explainable scoring

Every score must have a reason.

3. Raw data preservation

Never lose original job data.

4. Generic collectors first

Custom collectors only when necessary.

5. Rule-based ranking

LLMs assist normalization but do not control final scores.

6. Maintainability over complexity

Prefer simple and understandable systems over complex AI workflows.