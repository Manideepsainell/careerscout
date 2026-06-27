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
          Origin: `https://${domain}`,

Referer: `https://${domain}/`,
            "X-Requested-With":
              "XMLHttpRequest",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/149.0.0.0 Safari/537.36",
          },
        }
      );
   
   

const jobs =
  response.data?.data?.data || [];
      if (jobs.length === 0) {
        break;
      }

      allJobs.push(...jobs);

      start += jobs.length;
    } catch (error) {
      

      throw error;
    }
  }

  return allJobs;
};

export default getZwayamJobs;