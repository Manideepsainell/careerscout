import axios from "axios";

const getCapgeminiJobs = async (
  careersUrl
) => {
const pageSize=11;
  let page = pageSize;

  let allJobs = [];

let totalJobs = null;

while (true) {

  const response =
    await axios.get(
      careersUrl,
      {
        params: {
          country_code: "in-en",
          page,
          size: pageSize,
        },
      }
    );

  const jobs =
    response.data?.data || [];

  if (totalJobs === null) {
    totalJobs =
      response.data?.total ??
      response.data?.count;
  }

  if (!jobs.length) {
    break;
  }

  allJobs.push(...jobs);

  if (
    totalJobs &&
    allJobs.length >= totalJobs
  ) {
    break;
  }

  if (jobs.length < pageSize) {
    break;
  }

  page++;
}

  return allJobs;
};

export default getCapgeminiJobs;