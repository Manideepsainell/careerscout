Company:
Darwinbox

Careers URL:
https://darwinbox.com/careers

Endpoint:
https://dbx.darwinbox.in/ms/candidateapi/job/alljobs

Method:
POST

Auth:
NONE ✅

Payload:
{
  companyId: "main",
  page: 1,
  limit: 10,
  sort_option: "new"
}

Response:
response.data.data

Pagination:
Likely NO backend pagination.
"Load More" triggers no new requests.
Frontend appears to receive all jobs and reveal them gradually.

Useful Fields:
id                     -> externalJobId
title                  -> job title
locations              -> location
experience             -> experience
emp_type               -> Full-time / etc
department             -> department
jd                     -> description
posted_on              -> human readable date
created_on             -> ISO date
is_remote              -> remote flag

Example Mapping:
externalJobId = job.id
title = job.title
location = job.locations
experience = job.experience
description = job.jd
postedDate = new Date(job.created_on)

Job URL:
Still needs verification.
Need to inspect one Apply button click or job details page URL.

Collector Difficulty:
VERY EASY

Status:
READY FOR IMPLEMENTATION


Company:
Keka

Endpoint:
GET /careers/api/embedjobs/default/active/{guid}

Method:
GET

Auth:
None

Pagination:
None found

Response:
Array of jobs

Useful Fields:
id
title
description
departmentName
jobLocations
experience
jobNumber
publishedOn

externalJobId:
id

title:
title

description:
description

department:
departmentName

location:
jobLocations

postedDate:
publishedOn

jobNumber:
jobNumber

Company:
Juspay

Endpoint:
https://joinus.juspay.in/api/careerJobOpening?limit=1000&isGlobal=true

Method:
GET

Auth:
None

Pagination:
None

Response:
Array of jobs

externalJobId:
job_id

title:
job_title

location:
job_location

description:
job_description_career

experience:
experience_year

category:
category

jobType:
job_type

Difficulty:
Very Easy

Status:
Ready For Implementation

Company:
Qualcomm

Platform:
Eightfold

Endpoint:
https://careers.qualcomm.com/api/pcsx/search

Method:
GET

Auth:
None

Pagination:
YES

Parameters:
domain=qualcomm.com
query=
location=India
start=0
sort_by=distance

Response:
positions[]
count

Total Jobs:
415

externalJobId:
atsJobId

title:
name

location:
locations

department:
department

postedDate:
postedTs

jobUrl:
https://careers.qualcomm.com + positionUrl

Status:
NO NEW COLLECTOR NEEDED


Potential ATS:
PHENOM PEOPLE

Companies:
- Blue Yonder
- OpenText

Evidence:
- categoryMasterDataV2 endpoint
- Similar search-results structure
- Similar careers-site behavior

Status:
Need actual jobs endpoint


Company:
Virtusa

Platform:
Custom GraphQL

Endpoint:
https://prod.agenticweb-marketing.com/careers/graphql

Method:
POST

Auth:
None found

Payload:
{
  query: JobListResultsQuery,
  variables: {
    isList: "true"
  }
}

Response:
data.jobListResults.results[]

Pagination:
Not yet verified

Fields Found:
title
careerCtaLink
contestNumber
city
country
state
jobField
employeeStatus
skill
category
yearsOfExperience
descriptionExternalHTML
postedDate
lastModifiedDate

externalJobId:
contestNumber

title:
title

location:
city + state + country

description:
descriptionExternalHTML

experience:
yearsOfExperience

jobUrl:
https://www.virtusa.com + careerCtaLink

postedDate:
postedDate

Difficulty:
Easy-Medium

Status:
READY FOR IMPLEMENTATION (unless pagination exists)


Company:
EPAM

Endpoint:
https://careers.epam.com/api/jobs/v2/search/careers-i18n

Method:
GET

Auth:
None

Pagination:
YES

Parameters:
from=0
size=10

Likely:
from=10
from=20
from=30
...

Response:
{
  total: 167,
  jobs: [...]
}

Fields Found:
uid
name
city[]
posting_type
unique_id
tenant

externalJobId:
uid

title:
name

location:
city[]

totalJobs:
167

Status:
READY FOR IMPLEMENTATION

Company:
Coforge

Platform:
Zwayam

Endpoint:
https://public.zwayam.com/jobs/search

Method:
POST

Auth:
None

Status:
Use Existing Zwayam Collector

Coforge  -> Zwayam
Cyient   -> Zwayam

Company:
ADP

Response:
{
  count: 1,
  jobRequisitions: [...]
}

Auth:
None (appears public)

Fields Found:
reqId
clientRequisitionID
jobTitle
publishedJobTitle
jobDescription
requisitionLocations
canApply

externalJobId:
reqId

title:
publishedJobTitle
(or jobTitle)

description:
jobDescription

location:
requisitionLocations[0].address.cityName
+
countrySubdivisionLevel1.longName

jobUrl:
Need one more lookup

Pagination:
Need to verify

Status:
READY FOR IMPLEMENTATION

Company:
ADP

Platform:
ADP Recruiting

Endpoint:
GET /mycareer/public/staffing/v1/job-requisitions

Auth:
None

Response:
{
  count,
  jobRequisitions:[]
}

Pagination:
Likely supported

Fields:
reqId
clientRequisitionID
jobTitle
publishedJobTitle
jobDescription
requisitionLocations
postingDate

externalJobId:
reqId

Status:
NEW ATS FAMILY


DARWINBOX
---------
Status: Investigated
Endpoint: Found
Pagination: Found
Mapping: Found
Issue: Cloudflare 403
Action: Revisit later with Puppeteer/browser session

EPAM
-----
Endpoint discovered
Search API confirmed
Pagination confirmed
Collector not returning jobs
Need fresh investigation

Status: PARTIAL
Priority: Medium