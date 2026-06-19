import axios from "axios";
import {
  buildWorkdayJobsEndpoint,
  buildWorkdayJobUrl,
} from "../utils/workday.js";


const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

const collectWorkdayJobs = async (
  company
) => {
  console.log(
    `WORKDAY collector running for ${company.name}`
  );

  const careersUrl =
    company.openPositionsUrl;

  const endpoint =
    buildWorkdayJobsEndpoint(
      careersUrl
    );

  console.log(endpoint);

  const limit = 20;

  let offset = 0;
  let total = 0;
  let allPostings = [];

  while (true) {
    let response;

    for (
      let attempt = 1;
      attempt <= 3;
      attempt++
    ) {
      try {
        response =
          await axios.post(
            endpoint,
            {
              limit,
              offset,
            }
          );

        break;
      } catch (error) {
        console.log(
          `${company.name}: attempt ${attempt} failed`
        );

        if (attempt < 3) {
          await sleep(2000);
        }
      }
    }

    if (!response) {
      console.log(
        `${company.name}: stopping at offset ${offset}`
      );

      break;
    }

    if (offset === 0) {
      total = response.data.total;
    }

    console.log(
      `${company.name}: fetched ${offset}/${total}`
    );

    const postings =
      response.data.jobPostings;

    if (!postings.length) {
      break;
    }

    allPostings.push(
      ...postings
    );

    offset += postings.length;

    await sleep(200);

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
          posting
            .bulletFields?.[0] ||
          "",

        source: "WORKDAY",

        jobUrl:
          buildWorkdayJobUrl(
            company.openPositionsUrl,
            posting.externalPath
          ),
      })
    );

  if (jobs.length > 0) {
    console.log(jobs[0]);
  }

  console.log(
    `Retrieved ${jobs.length} jobs`
  );

  return jobs;
};

export default collectWorkdayJobs;

