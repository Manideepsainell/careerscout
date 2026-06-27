import axios from "axios";

const getCapgeminiJobs = async (
  careersUrl
) => {
const paageSize=11;
  let page = pageSize;

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


    if (jobs.length === 0) {
      break;
    }

    allJobs.push(...jobs);
    const totalJobs = response.data?.total ?? response.data?.count;

if (allJobs.length >= totalJobs) {
  break;
}

    if (jobs.length < 11) {
      break;
    }

    page++;
  }

  return allJobs;
};

export default getCapgeminiJobs;