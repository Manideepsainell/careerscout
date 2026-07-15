import axios from "axios";
import * as cheerio from "cheerio";

const enrichSuccessFactorsJob = async (job) => {
  try {
    const { data: html } = await axios.get(job.jobUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 15000,
    });

    const $ = cheerio.load(html);
    const description = $('[itemprop="description"]')
      .first()
      .text()
      .replace(/\\r\\n/g, "\n")
      .replace(/\s+/g, " ")
      .trim();

    return { ...job, description };
  } catch (error) {
    console.log(`Enrich failed for ${job.jobUrl}: ${error.message}`);
    return job;
  }
};

export default enrichSuccessFactorsJob;