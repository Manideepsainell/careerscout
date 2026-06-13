import axios from "axios";

const getDarwinboxJobs = async (
  careersUrl,
  companyId = "main"
) => {

  let page = 1;

  const allJobs = [];

  while (true) {

    const response =
  await axios.post(
    careersUrl,
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
          "https://sonataone.darwinbox.in",

        Referer:
          "https://sonataone.darwinbox.in/",

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

    if (jobs.length < 10) {
      break;
    }

    page++;
  }

  return allJobs;
};

export default getDarwinboxJobs;