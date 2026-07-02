import axios from "axios";
import * as cheerio from "cheerio";

const response = await axios.get(
  "https://whatfix101.hire.trakstar.com/"
);

const $ = cheerio.load(response.data);

$("a").each((_, el) => {
  const href = $(el).attr("href");

  if (
    href &&
    href.startsWith("/jobs/")
  ) {
    console.log({
      title: $(el).text().trim(),
      href
    });
  }
});