import axios from "axios";
import * as cheerio from "cheerio";

const response = await axios.get(
  "https://nxtwave.freshteam.com/jobs"
);

const $ = cheerio.load(response.data);

console.log(
  $("a").length
);

$("a").each((i, el) => {
  const text = $(el).text().trim();

  if (
    text.includes("Business Development")
  ) {
    console.log($.html(el));
    console.log("----------------");
  }
});