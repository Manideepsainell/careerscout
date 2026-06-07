# Company Discovery Metadata V1

## Purpose

CareerScout discovers jobs from company career portals.

Different companies use different Applicant Tracking Systems (ATS).

To support reusable collectors, every company must contain enough metadata for collector selection.

---

## Core Discovery Fields

### jobBoardType

Identifies which ATS or job board powers the company's job listings.

Examples:

* WORKDAY
* GREENHOUSE
* SMARTRECRUITERS
* EIGHTFOLD
* RIPPLEHIRE
* DARWINBOX
* SUCCESSFACTORS
* TALEO
* ORACLE
* CORNERSTONE
* LINKEDIN
* CUSTOM
* UNKNOWN

---

### openPositionsUrl

Direct URL where active jobs are listed.

Examples:

BrowserStack

Careers URL:
https://www.browserstack.com/careers

Open Positions URL:
https://browserstack.wd3.myworkdayjobs.com/External

Razorpay

Careers URL:
https://razorpay.com/jobs

Open Positions URL:
https://job-boards.greenhouse.io/razorpay

The collector should prefer openPositionsUrl over careersUrl whenever available.

---

## Collector Selection Flow

Company
↓
jobBoardType
↓
Collector Selection
↓
Job Collection
↓
Normalization
↓
MongoDB

Example:

BrowserStack
↓
WORKDAY
↓
Workday Collector

Razorpay
↓
GREENHOUSE
↓
Greenhouse Collector

Freshworks
↓
SMARTRECRUITERS
↓
SmartRecruiters Collector

---

## Classification Rules

CUSTOM

The company uses its own career platform and does not expose a reusable ATS pattern.

Examples:

* Zoho
* Juspay
* Keka

UNKNOWN

Insufficient information is available to determine the ATS.

Examples:

* Nisum
* Companies with no active openings

---

## Design Principle

Collector selection should be based on ATS type rather than company name.

Preferred:

Company
↓
jobBoardType
↓
Collector

Avoid:

Company
↓
Custom Collector Per Company

Reusable ATS collectors provide significantly higher coverage and lower maintenance cost.

