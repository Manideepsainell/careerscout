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

  const endpoint =
    buildWorkdayJobsEndpoint(
      company.openPositionsUrl
    );

  console.log(endpoint);

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
 response = await axios.post(
  endpoint,
  {
    appliedFacets: {},
    limit,
    offset,
    searchText: ""
  },
  {
    timeout: 20000,
    headers: {
      "Content-Type": "application/json"
    }
  }
);  break;
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
            company.openPositionsUrl,
            posting.externalPath
          ),
      })
    );

  console.log(
    `Retrieved ${jobs.length} jobs`
  );

  return jobs;
};

export default collectWorkdayJobs;