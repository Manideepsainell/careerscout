import axios from "axios";

const getEpamJobs = async () => {
  let from = 0;

  const size = 10;

  let allJobs = [];

  while (true) {
    const response =
      await axios.get(
        "https://careers.epam.com/api/jobs/v2/search/careers-i18n",
        {
         params: {
  facets: "country=4060741400035606931",
  from,
  lang: "en",
  size,
  sortBy: "relevance;relocation=asc",
  websiteLocale: "en-us",
}
        }
      );


const jobs =
  response.data?.data?.jobs || [];

    

    if (jobs.length === 0) {
      break;
    }

    allJobs.push(...jobs);

    from += size;
  }

return allJobs;
 
};

export default getEpamJobs;