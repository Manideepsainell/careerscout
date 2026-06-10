import axios from "axios";
import FormData from "form-data";

const getZwayamJobs = async (
  apiUrl,
  companyId,
  domain
) => {
  let start = 0;

  let allJobs = [];

  while (true) {
    console.log(`Fetching from ${start}`);
    console.log("DOMAIN:", domain);
    console.log("COMPANY ID:", companyId);

    const form = new FormData();

    form.append(
      "filterCri",
      JSON.stringify({
        paginationStartNo: start,
        selectedCall: "sort",
        sortCriteria: {
          name: "modifiedDate",
          isAscending: false,
        },
        anyOfTheseWords: "",
      })
    );

    form.append("domain", domain);
    form.append("companyId", companyId);

    try {
      const response = await axios.post(
        apiUrl,
        form,
        {
          headers: {
            ...form.getHeaders(),
            Accept:
              "application/json, text/plain, */*",
            Origin:
              "https://careers.persistent.com",
            Referer:
              "https://careers.persistent.com/",
            "X-Requested-With":
              "XMLHttpRequest",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/149.0.0.0 Safari/537.36",
          },
        }
      );
   

const jobs =
  response.data?.data?.data || [];
    //   console.log(
    //     `Retrieved ${jobs.length}`
    //   );
    console.log(
  "START:",
  start,
  "COUNT:",
  jobs.length,
  "TOTAL:",
  response.data?.data?.totalCount,
  "MORE:",
  response.data?.data?.hasMoreData
);
  console.log(
  `Retrieved ${jobs.length}`
);
      if (jobs.length === 0) {
        break;
      }

      allJobs.push(...jobs);

      start += jobs.length;
    } catch (error) {
      console.log(
        "STATUS:",
        error.response?.status
      );

      console.log(
        "DATA:",
        error.response?.data
      );

      throw error;
    }
  }

  return allJobs;
};

export default getZwayamJobs;