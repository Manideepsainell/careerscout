import axios from "axios";
import * as cheerio from "cheerio";

const collectFreshteamJobs = async (
  company
) => {
  
const baseUrl = new URL(
  company.openPositionsUrl
).origin;
  const response = await axios.get(
    company.openPositionsUrl
  );

  const $ = cheerio.load(response.data);

  const jobs = [];
$("a.row, a.heading").each(
  (_, el) => {
    const title = $(el)
      .find(".job-title")
      .text()
      .trim();
let location = "Not Specified";
let jobType = "";

if ($(el).find(".location-info").length) {
  const info = $(el)
    .find(".location-info")
    .text()
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  location = info[0] || "Not Specified";
  jobType = info[1] || "";
}
    const href = $(el).attr("href");

    jobs.push({
      title,

      company: company._id,

      location,
      jobType,

      source: "FRESHTEAM",

      externalJobId:
        href.split("/")[2],

      jobUrl:
  `${baseUrl}${href}`,

     description: $(el)
  .find(".job-desc")
  .text()
  .replace(/\s+/g, " ")
  .trim(),

      postedDate: null,
    });
  }
);
 

  return jobs;
};

export default collectFreshteamJobs;