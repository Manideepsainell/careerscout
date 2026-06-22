import axios from "axios";
import * as cheerio from "cheerio";

const collectFreshteamJobs = async (
  company
) => {
  console.log(
    `Freshteam collector running for ${company.name}`
  );

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

    let location = "";

    if ($(el).find(".location-info").length) {
      location = $(el)
        .find(".location-info")
        .text()
        .replace(/\s+/g, " ")
        .trim();
    } else {
      location = $(el)
        .find(".job-desc")
        .text()
        .replace(/\s+/g, " ")
        .trim();
    }

    const href = $(el).attr("href");

    jobs.push({
      title,

      company: company._id,

      location,

      source: "FRESHTEAM",

      externalJobId:
        href.split("/")[2],

      jobUrl:
        `https://${company.slug}.freshteam.com${href}`,

      description: "",

      postedDate: null,
    });
  }
);
 

  console.log(
    `${jobs.length} jobs found`
  );

  return jobs;
};

export default collectFreshteamJobs;