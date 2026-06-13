import axios from "axios";
import * as cheerio from "cheerio";

const getMastechJobs = async (
  careersUrl
) => {

  const response =
    await axios.get(careersUrl);

  const $ =
    cheerio.load(response.data);

  const jobs = [];

  $("a.a_tag_hover").each(
    (_, element) => {

      jobs.push({

        title:
          $(element)
            .find(
              "h3.main-job-list-title"
            )
            .text()
            .trim(),

        description:
          $(element)
            .find("p")
            .text()
            .trim(),

        location:
          $(element)
            .find(
              "div.main-job-list-location"
            )
            .text()
            .trim(),

        url:
          new URL(
            $(element).attr("href"),
            careersUrl
          ).href,

      });
    }
  );

  return jobs;
};

export default getMastechJobs;