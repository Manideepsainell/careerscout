# CareerScout Scoring Engine

## Purpose

The scoring engine ranks jobs based on relevance to the user.

Goal:

Identify the highest ROI opportunities and reduce manual job filtering.

---

# Score Distribution

| Category | Weight |
|-----------|----------|
| Experience Match | 25 |
| Role Match | 20 |
| Skills Match | 20 |
| Location Match | 10 |
| Company Category | 10 |
| Freshness | 10 |
| Interview History | 5 |
| Total | 100 |

---

# Experience Match (25)

| Requirement | Score |
|------------|--------|
| Internship | 25 |
| 0-1 Years | 22 |
| 0-2 Years | 18 |
| 0-3 Years | 10 |
| 4+ Years | -50 |

Purpose:

Prioritize fresher-friendly opportunities.

---

# Role Match (20)

| Role | Score |
|--------|--------|
| Backend Engineer | 20 |
| Software Engineer | 20 |
| Associate Software Engineer | 18 |
| Product Engineer | 18 |
| Graduate Engineer Trainee | 16 |
| Full Stack Developer | 14 |
| Java Developer | 12 |

Negative Matches:

| Role | Score |
|--------|--------|
| QA Engineer | -50 |
| Support Engineer | -50 |
| Salesforce Developer | -50 |
| AI Trainer | -50 |

Purpose:

Filter out irrelevant roles immediately.

---

# Skills Match (20)

Preferred Skills:

- Node.js
- Express
- MongoDB
- Java
- JavaScript
- React
- REST APIs
- Git

Example Scoring:

| Skill | Score |
|---------|--------|
| Node.js | 5 |
| MongoDB | 4 |
| Express | 3 |
| Java | 4 |
| React | 2 |

Maximum Score: 20

---

# Location Match (10)

| Location | Score |
|------------|--------|
| Remote | 10 |
| Hyderabad | 10 |
| Bangalore | 8 |
| Pune | 8 |
| Noida | 8 |
| Gurgaon | 7 |
| Chennai | 6 |

Purpose:

Prioritize preferred locations.

---

# Company Category Match (10)

| Category | Score |
|-------------|--------|
| SaaS | 10 |
| Product | 9 |
| Startup | 8 |
| Enterprise | 6 |
| Service | 5 |

Purpose:

Prefer higher-growth product-focused companies.

---

# Freshness Score (10)

| Posted | Score |
|-----------|--------|
| Today | 10 |
| 1 Day | 9 |
| 3 Days | 8 |
| 7 Days | 5 |
| 15 Days | 2 |
| 30+ Days | 0 |

Purpose:

Prioritize recent opportunities.

---

# Interview History Score (5)

Use historical interview outcomes to improve ranking.

Examples:

- Backend roles
- Startup roles
- SaaS companies

can receive additional weighting based on previous success patterns.

Maximum Score: 5

---

# Verdict Rules

| Score | Verdict |
|---------|---------|
| 90+ | MUST_APPLY |
| 75-89 | APPLY |
| 60-74 | MAYBE |
| Below 60 | SKIP |

---

# Confidence Levels

| Confidence | Meaning |
|-------------|------------|
| HIGH | Sufficient job information available |
| MEDIUM | Partial information available |
| LOW | Missing or unclear job details |

---

# Example Result

```json
{
  "overallScore": 92,
  "verdict": "MUST_APPLY",
  "confidence": "HIGH",
  "reasons": [
    "Node.js Match",
    "Remote Role",
    "Posted Today",
    "SaaS Company"
  ]
}
```

---

# Gemini Responsibilities

Gemini does NOT decide scores.

Gemini is only used for:

- Skill extraction
- Experience extraction
- Job normalization
- Missing data recovery

Final scoring remains rule-based and fully explainable.