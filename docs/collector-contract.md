# Collector Contract V1

## Goal

Every collector must return jobs in the same format,
regardless of where the jobs were collected from.

Examples:

- Workday
- Greenhouse
- SmartRecruiters
- Eightfold
- RippleHire
- Custom Company Sites

## Collector Input

Each collector receives a Company document.

Example:

{
  _id: "companyId",

  name: "BrowserStack",

  careersUrl: "...",

  category: "Product",

  location: "Mumbai",

  priority: "HIGH"
}

## Collector Output

Every collector must return an array of normalized jobs.

Example:

[
  {
    title: "Software Engineer",

    company: companyId,

    location: "Hyderabad",

    jobType: "Full Time",

    experience: "2-4 Years",

    salary: "Not Disclosed",

    description: "...",

    source: "WORKDAY",

    jobUrl: "https://...",

    externalJobId: "R-791084",

    postedDate: "2026-06-01"
  }
]