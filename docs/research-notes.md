
Last Major Update: 13 June
Companies: 64
Jobs: 15,001+
Project Phase: Product & Relevance
# CareerScout Research Notes

## Current Status

### Database

* Companies: 64
* Jobs Collected: 15,001+

---

# Implemented ATS Families

## Workday

* BrowserStack
* Synchrony
* Salesforce
* NVIDIA
* NCR Atleos
* Franklin Templeton
* State Street
* Medtronic
* Thomson Reuters
* FactSet

## Greenhouse

* Postman
* Razorpay
* HighRadius
* Zenoti
* PhonePe
* Groww

## SmartRecruiters

* ServiceNow
* Freshworks

## Oracle

* Oracle
* Zensar
* Hexaware

## SuccessFactors

* Wipro
* HCLTech

## RippleHire

* LTIMindtree
* Mphasis

## Zwayam

* Cyient
* Coforge
* Persistent Systems

## Taleo

* UnitedHealth Group

## Cornerstone

* Cornerstone OnDemand

## Keka

* Keka

## Zoho Recruit

* Zoho

## Virtusa

* Virtusa

## Accenture ATS

* Accenture

## Infosys ATS

* Infosys

## Capgemini Azure ATS

* Capgemini

## IBM Careers Search

* IBM

## HTML Scraping

* Mastech Digital

## Aggregator Sources

* 10K Coders

---

# Today's Implementations

## LTIMindtree

Status: Implemented

Jobs:

* 226+

ATS:

* RippleHire

Notes:

* Token-based implementation
* Pagination verified

---

## Mphasis

Status: Implemented

Jobs:

* 74+

ATS:

* RippleHire

Notes:

* Reused RippleHire collector
* Company-specific token

---

## Accenture

Status: Implemented

Jobs:

* 1008+

ATS:

* Accenture Elastic Search API

Notes:

* startIndex pagination
* Safety stop implemented

---

## Infosys

Status: Implemented

Jobs:

* 1632+

ATS:

* Infosys Internal ATS

Notes:

* Single endpoint
* Full job payload available

---

## Capgemini

Status: Implemented

Jobs:

* 817+

ATS:

* Azure Job API

Notes:

* Pagination verified

---

## IBM

Status: Implemented

Jobs:

* 100+

ATS:

* IBM Careers Search

Notes:

* _source mapping required
* Pagination working

---

## Freshworks

Status: Implemented

Jobs:

* 73+

ATS:

* SmartRecruiters

Notes:

* Existing collector reused

---

## Mastech Digital

Status: Implemented

Jobs:

* 16+

ATS:

* HTML Scraping

Notes:

* HubSpot careers page
* Cheerio scraper

---

## 10K Coders

Status: Implemented

Jobs:

* 38+

Source:

* Internal Job Platform

Notes:

* page/page_size pagination
* has_more support
* Useful for internship and startup opportunities

---

# Blocked

## Sonata Software

ATS:

* Darwinbox

Status:

* Blocked

Issue:

* Cloudflare protection
* 403 Forbidden

Notes:

* Endpoint verified
* Payload verified
* Collector logic understood

Future Options:

* Browser automation
* Puppeteer
* Session-based scraping

---

# Zero Job Companies (Do Not Prioritize Immediately)

* Darwinbox
* Chargebee
* ValueLabs
* Innominds
* Nisum
* Ahex Technologies
* TEKsystems Global Services
* T-Mobile
* Blue Yonder
* Ivanti
* EPAM Systems
* ADP
* OpenText
* Progress
* Pegasystems
* Fidelity International
* Sonata Software

Notes:

* Do not chase blindly.
* Prioritize only if role quality aligns with CareerScout goals.

---

# Product Direction

CareerScout Goal:

Not:

* Collect maximum jobs

Instead:

* Surface the best opportunities quickly

Priority Ranking:

1. Freshness
2. Experience Level
3. Location
4. Internship Quality
5. Opportunity Scoring

Target Roles:

* Backend Developer
* Java Developer
* MERN Developer
* Full Stack Developer
* Associate Engineer
* Graduate Engineer Trainee
* SDE
* Software Engineer

Target Experience:

* Internship
* 0-1 Years
* 0-2 Years

Preferred Locations:

* Hyderabad
* Remote
* Pune
* Noida
* Chennai
* Gurgaon
* Bangalore (when opportunity quality justifies relocation)

Special Focus:

* Paid Internships
* PPO / Conversion Opportunities
* Backend Internships
* MERN Internships
* Startup Roles with Growth Potential

---

# Next Phase

Sunday:

* Frontend Integration
* Freshness Filter
* Experience Filter
* Location Filter

Monday Onwards:

* 70% Product
* 30% Collector Expansion

Collector Rule:

* Add companies based on relevance and opportunity quality
* Not based on company count alone
