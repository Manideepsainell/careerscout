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

      
      if (
        attempt === 1 &&
        company.openPositionsUrl
      ) {
       

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
    

    break;
  }

  const {
    total: responseTotal,
    jobPostings,
  } = response.data;

  if (
    !Array.isArray(jobPostings)
  ) {
    

  

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

  
  if (
    allPostings.length >= total
  ) {
    break;
  }
}

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




  return jobs;
};

export default collectWorkdayJobs;