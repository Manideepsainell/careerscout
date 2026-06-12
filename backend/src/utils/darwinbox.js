import axios from "axios";

const getDarwinboxJobs = async (
  companyId
) => {
  let page = 1;

  let allJobs = [];

 while (true) {
  try {
    const response =
      await axios.post(
        `https://dbx.darwinbox.in/ms/candidateapi/job/alljobs?companyId=${companyId}`,
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

            Origin:
              "https://dbx.darwinbox.in",

            Referer:
"https://dbx.darwinbox.in/ms/candidatev2/main/careers/allJobs",

            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/149.0.0.0 Safari/537.36",

            "Content-Type":
              "application/json",
          },
        }
      );

    const jobs =
      response.data?.data || [];

    console.log(
      `Page ${page}: ${jobs.length} jobs`
    );

    if (jobs.length === 0) {
      break;
    }

    allJobs.push(...jobs);

    page++;
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

export default getDarwinboxJobs;