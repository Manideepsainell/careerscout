import axios from "axios";
import * as cheerio from "cheerio";

const collectTopGradingJobs = async (company) => {
 const response = await axios.get(
  company.openPositionsUrl
);
  

  const $ = cheerio.load(
    response.data
  );

  
  const jobs = [];

$(".job-openings li.job").each(
  (_, element) => {
    const title = $(element)
      .find("h2")
      .text()
      .trim();

    const location = $(element)
      .find("p")
      .text()
      .trim();

    const applyPath = $(element)
      .find("a")
      .attr("href");

    jobs.push({
      title,

      company: company._id,

      location:
        location ||
        "Not Specified",

      source: "TOPGRADING",

      externalJobId:
        applyPath
          ?.split("/")
          .pop(),

      jobUrl:
        `https://evergent.topgradingonline.com${applyPath}`,

      description: "",
    });
    
  }
);

return jobs;
};

export default collectTopGradingJobs;