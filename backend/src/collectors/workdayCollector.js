import axios from "axios";
import {
  buildWorkdayJobsEndpoint,
  buildWorkdayJobUrl,
} from "../utils/workday.js";

const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
const parseWorkdayPostedDate = (
  postedOn
) => {
  if (!postedOn) return null;

  const text =
    postedOn.toLowerCase();

  if (text.includes("today")) {
    return new Date();
  }

  if (
    text.includes("yesterday")
  ) {
    const date = new Date();

    date.setDate(
      date.getDate() - 1
    );

    return date;
  }

  const match =
    text.match(/(\d+)/);

  if (match) {
    const date = new Date();

    date.setDate(
      date.getDate() -
        Number(match[1])
    );

    return date;
  }

  return null;
};
const collectWorkdayJobs = async (
  company
) => {
  console.log(
    `WORKDAY collector running for ${company.name}`
  );
let endpoint =
  buildWorkdayJobsEndpoint(
    company.careersUrl
  );

const limit = 20;

let offset = 0;
let total = 0;

const allPostings = [];

while (true) {
  let response = null;

  for (
    let attempt = 1;
    attempt <= 3;
    attempt++
  ) {
    try {

      console.log(
        `${company.name}: ${endpoint}`
      );

      response = await axios.post(
        endpoint,
        {
          appliedFacets: {},
          limit,
          offset,
          searchText: "",
        },
        {
          timeout: 20000,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      break;

    } catch (error) {

      console.log(
        `${company.name}: attempt ${attempt} failed`
      );

      console.log(
        error.response?.status
      );

      console.log(
        error.response?.data
      );

      if (
        attempt === 1 &&
        company.openPositionsUrl
      ) {
        console.log(
          `${company.name}: trying openPositionsUrl fallback`
        );

        endpoint =
          buildWorkdayJobsEndpoint(
            company.openPositionsUrl
          );

        continue;
      }

      if (attempt < 3) {
        await sleep(500);
      }
    }
  }

  if (!response) {
    console.log(
      `${company.name}: stopping at offset ${offset}`
    );

    break;
  }

  const {
    total: responseTotal,
    jobPostings,
  } = response.data;

  if (
    !Array.isArray(jobPostings)
  ) {
    console.log(
      `${company.name}: invalid response`
    );

    console.log(
      JSON.stringify(
        response.data,
        null,
        2
      )
    );

    break;
  }

  if (offset === 0) {
    total = responseTotal;
  }

  if (!jobPostings.length) {
    break;
  }

  allPostings.push(
    ...jobPostings
  );

  offset += jobPostings.length;

  console.log(
    `${company.name}: fetched ${allPostings.length}/${total}`
  );

  if (
    allPostings.length >= total
  ) {
    break;
  }
}
console.log(
  `${company.name} total jobs: ${allPostings.length}`
);

const jobs =
  allPostings.map(
    (posting) => ({
      title: posting.title,

      company: company._id,

      location:
        posting.locationsText,

      externalJobId:
        posting.externalPath
          ?.split("/")
          .pop() || "",

      source: "WORKDAY",

      jobUrl:
  buildWorkdayJobUrl(
    company.careersUrl ||
    company.openPositionsUrl,
    posting.externalPath
  ),

      postedDate:
        parseWorkdayPostedDate(
          posting.postedOn
        ),
    })
  );

console.log(
  `Retrieved ${jobs.length} jobs`
);


  return jobs;
};

export default collectWorkdayJobs;