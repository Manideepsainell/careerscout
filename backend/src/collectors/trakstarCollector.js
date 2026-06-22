import axios from "axios";
import * as cheerio from "cheerio";

const collectTrakstarJobs = async (
  company
) => {
  console.log(
    `Trakstar collector running for ${company.name}`
  );

  const response = await axios.get(
    company.openPositionsUrl
  );

  const $ = cheerio.load(
    response.data
  );

  const jobs = [];

  $("a").each((_, el) => {
    const href = $(el).attr("href");

    if (
      !href ||
      !href.startsWith("/jobs/")
    ) {
      return;
    }

    const title = $(el)
      .text()
      .replace(/\s+/g, " ")
      .trim();

    if (!title) {
      return;
    }

    jobs.push({
      title,

      company: company._id,

      location: "Not Specified",

      source: "TRAKSTAR",

      externalJobId:
        href.split("/")[2],

      jobUrl:
        company.openPositionsUrl.replace(
          /\/$/,
          ""
        ) + href,

      description: "",

      postedDate: null,
    });
  });

  console.log(
    `${jobs.length} jobs found`
  );

  return jobs;
};

export default collectTrakstarJobs;