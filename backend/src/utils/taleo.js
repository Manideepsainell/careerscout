import axios from "axios";
import * as cheerio from "cheerio";

const getTaleoJobs = async (careersUrl) => {
  let currentPage = 1;
  let allJobs = [];

  while (currentPage <= 3) {
    console.log(`Fetching page ${currentPage}`);

    const response = await axios.get(
      `${careersUrl}/search-jobs/results`,
      {
        params: {
          ActiveFacetID: 0,
          CurrentPage: currentPage,
          RecordsPerPage: 15,
          TotalContentResults: "",
          Distance: 50,
          RadiusUnitType: 0,
          Keywords: "",
          Location: "",
          ShowRadius: "False",
          IsPagination: "False",
          CustomFacetName: "",
          FacetTerm: "",
          FacetType: 0,
          SearchResultsModuleName: "Search Results",
          SearchFiltersModuleName: "Search Filters",
          SortCriteria: 0,
          SortDirection: 0,
          SearchType: 5,
          PostalCode: "",
          ResultsType: 0,
          fc: "",
          fl: "",
          fcf: "",
          afc: "",
          afl: "",
          afcf: "",
          TotalContentPages: "NaN",
        },
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "*/*",
        },
      }
    );

   const html = response.data.results;
const $ = cheerio.load(html);

    const jobs = [];

    $("a").each((i, el) => {
      const href = $(el).attr("href");

      const rawText = $(el)
        .text()
        .replace(/\s+/g, " ")
        .trim();

      const isIndia =
        rawText.includes("Hyderabad") ||
        rawText.includes("Bangalore") ||
        rawText.includes("Bengaluru") ||
        rawText.includes("Pune") ||
        rawText.includes("Chennai") ||
        rawText.includes("Gurgaon") ||
        rawText.includes("Noida") ||
        rawText.includes("Mumbai") ||
        rawText.includes("India");

      if (
  !href ||
  !href.includes("/job/")
) {
  return;
}

if (!isIndia) {
  return;
}

      jobs.push({
       title: rawText
  .split(/\d{7}/)[0]
  .trim(),
        url: `https://careers.unitedhealthgroup.com${href}`,
      });
    });

    console.log(`Retrieved ${jobs.length} jobs`);

    if (jobs.length === 0) {
      break;
    }

    allJobs.push(...jobs);

    currentPage++;
  }

  return allJobs;
};

export default getTaleoJobs;