import axios from "axios";
import * as cheerio from "cheerio";

const getSuccessFactorsCSBJobs = async (url) => {
  const response = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const $ = cheerio.load(response.data);

  const jobs = [];

  $("tr.data-row").each((_, row) => {
    const titleLink = $(row).find("a.jobTitle-link");

    const href = titleLink.attr("href");
    if (!href) return;
const postedDate = $(row)
  .find("span.jobDate")
  .first()
  .text()
  .trim();
    jobs.push({
      title: titleLink.text().trim(),
      url: new URL(href, url).href,
      location: $(row).find(".jobLocation").text().trim(),
      department: $(row).find(".jobDepartment").text().trim(),
      postedDate,
    });
  });

  console.log(`Retrieved ${jobs.length} jobs`);

  return jobs;
};

export default getSuccessFactorsCSBJobs;