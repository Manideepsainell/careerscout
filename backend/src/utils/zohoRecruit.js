import axios from "axios";
import * as cheerio from "cheerio";

const getZohoRecruitJobs = async (apiUrl) => {

  // Try API first
  const response = await axios.get(apiUrl, {
    params: {
      pagename: "Careers",
      source: "CareerSite",
      extra_fields: JSON.stringify(["Remote_Job"]),
    },
  });

  if (response.data?.data?.length) {
    return response.data.data;
  }

  // Fallback to HTML
  const html = (await axios.get(apiUrl)).data;

  const $ = cheerio.load(html);

  const encoded = $("#jobs").attr("value");

  if (!encoded) {
    return [];
  }

  const decoded = encoded
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  return JSON.parse(decoded);
};

export default getZohoRecruitJobs;