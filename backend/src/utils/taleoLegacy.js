import axios from "axios";
import * as cheerio from "cheerio";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";

const RECORD_SIZE = 37; // fields per job in the fillList() array (legacy Taleo layout)

const extractHiddenFields = ($) => {
  const fields = {};
  $("input[type=hidden]").each((_, el) => {
    const name = $(el).attr("name");
    const value = $(el).attr("value") ?? "";
    if (name) fields[name] = value;
  });
  return fields;
};

const extractJobArray = (html) => {
  const match = html.match(
    /api\.fillList\('requisitionListInterface',\s*'listRequisition',\s*(\[[\s\S]*?\])\)/
  );
  if (!match) return [];

  const raw = match[1];
  const values = [];
  const re = /'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(raw)) !== null) {
    values.push(m[1].replace(/\\'/g, "'").replace(/\\\\/g, "\\"));
  }
  return values;
};

const parseJobs = (html, baseUrl) => {
  const flat = extractJobArray(html);
  const jobs = [];

  for (let i = 0; i + RECORD_SIZE <= flat.length; i += RECORD_SIZE) {
    const rec = flat.slice(i, i + RECORD_SIZE);

    const reqNo = rec[1];
    const title = rec[2];
    const schedule = rec[6];
    const location = rec[7];
  const submissionText = rec[28] || "";
    const jobNumberMatch = submissionText.match(/Job Number:\s*([\dA-Za-z]+)/);
    const jobNumber = jobNumberMatch ? jobNumberMatch[1] : null;

    if (!title) continue;

    jobs.push({
      reqNo,
      jobNumber,
      title,
      schedule,
      location,
     url: jobNumber
  ? `${baseUrl}jobdetail.ftl?job=${jobNumber}&lang=en`
  : null,
    });
  }

  return jobs;
};

const getTaleoLegacyJobs = async (careersUrl, taleoConfig = {}) => {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar, withCredentials: true }));

  const pageSize = taleoConfig.recordsPerPage ?? 100;
  const indiaOnly = taleoConfig.indiaOnly ?? true;

  console.log(`Fetching initial page: ${careersUrl}`);
  const initialRes = await client.get(careersUrl, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  let $ = cheerio.load(initialRes.data);
  let fields = extractHiddenFields($);

  const formAction = $("form#ftlform").attr("action") || "moresearch.ftl";
  const postUrl = new URL(formAction, careersUrl).href;
  const baseUrl =
    new URL(careersUrl).origin +
    new URL(careersUrl).pathname.replace(/[^/]+$/, "");

  fields.dropListSize = String(pageSize);
  fields["rlPager.currentPage"] = "1";

  let currentPage = 1;
  let allJobs = [];
  const seenReqNos = new Set();

  while (true) {
    console.log(`Fetching page ${currentPage}`);

    const res = await client.post(
      postUrl,
      new URLSearchParams(fields).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const html = res.data;
    const jobs = parseJobs(html, baseUrl).filter((j) => {
      if (seenReqNos.has(j.reqNo)) return false;
      seenReqNos.add(j.reqNo);
      return indiaOnly ? /india/i.test(j.location || "") : true;
    });

    console.log(`Retrieved ${jobs.length} new jobs on page ${currentPage}`);

    if (jobs.length === 0) break;
    allJobs.push(...jobs);

    $ = cheerio.load(html);
    fields = { ...fields, ...extractHiddenFields($) };

    const totalElements = parseInt(fields["listRequisition.nbElements"] || "0", 10);
    const totalPages = Math.ceil(totalElements / pageSize);

    if (currentPage >= totalPages) break;
    currentPage++;
    fields["rlPager.currentPage"] = String(currentPage);
  }

  return allJobs;
};

export default getTaleoLegacyJobs;