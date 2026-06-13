import axios from "axios";

const getCapgeminiJobs = async (
  careersUrl
) => {

  let page = 1;

  let allJobs = [];

  while (true) {

    const response =
      await axios.get(
        careersUrl,
        {
          params: {
            country_code: "in-en",
            page,
            size: 11,
          },
        }
      );

    const jobs =
      response.data?.data || [];

    console.log(
      `Page ${page}: ${jobs.length}`
    );

    if (jobs.length === 0) {
      break;
    }

    allJobs.push(...jobs);

    if (jobs.length < 11) {
      break;
    }

    page++;
  }

  return allJobs;
};

export default getCapgeminiJobs;