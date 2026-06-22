import axios from "axios";

const getDarwinboxJobs = async (
  baseUrl,
  companyId = "main"
) => {

  const allJobs = [];

  let page = 1;

  while (true) {

    try {

      const response = await axios.post(
        `${baseUrl}/ms/candidateapi/job/alljobs?companyId=${companyId}`,
        {
          companyId,
          page,
          sort_option: "new",
          limit: 10,
        },
        {
          headers: {
            Accept:
              "application/json, text/plain, */*",

            "Accept-Language":
              "en",

            "Content-Type":
              "application/json",

            Origin: baseUrl,

            Referer:
              `${baseUrl}/ms/candidatev2/main/careers/allJobs`,

            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",

            "sec-fetch-site":
              "same-origin",

            "sec-fetch-mode":
              "cors",
          },
        }
      );

      const jobs =
        response.data?.data || [];

      console.log(
        `Page ${page}: ${jobs.length} jobs`
      );

      if (!jobs.length) {
        break;
      }

      allJobs.push(...jobs);

      if (jobs.length < 10) {
        break;
      }

      page++;

    } catch (error) {

      console.log(
        `Failed on page ${page}`
      );

      console.log(
        "Status:",
        error.response?.status
      );

      console.log(
        "Response Data:"
      );

      console.log(
        error.response?.data
      );

      console.log(
        "Response Headers:"
      );

      console.log(
        error.response?.headers
      );

      break;
    }
  }

  return allJobs;
};

export default getDarwinboxJobs;