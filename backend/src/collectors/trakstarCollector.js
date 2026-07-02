import axios from "axios";
import * as cheerio from "cheerio";

const collectTrakstarJobs = async (
  company
) => {
  

  const response = await axios.get(
    company.openPositionsUrl
  );

  const $ = cheerio.load(
    response.data
  );

  const jobs = [];

$("a[href^='/jobs/']").each((_, el) => {
  const title = $(el)
    .find(".js-job-list-opening-name")
    .text()
    .replace(/^\d+\s*-\s*/, "")
    .trim();

  const location = $(el)
    .find(".js-job-list-opening-loc")
    .text()
    .replace(/\s+/g, " ")
    .trim();

  const jobType = $(el)
    .find(".js-job-list-opening-meta span")
    .first()
    .text()
    .trim();

  const href = $(el).attr("href");

  jobs.push({
    title,

    company: company._id,

    location:
      location || "Not Specified",

    jobType:
      jobType || "Full Time",

    source: "TRAKSTAR",

    externalJobId:
      href.split("/")[2],

    jobUrl:
      company.openPositionsUrl.replace(/\/$/, "") +
      href,

    description: "",

    postedDate: null,
  });
});

const firstJob = $("a[href^='/jobs/']").first();


  return jobs;
};

export default collectTrakstarJobs;