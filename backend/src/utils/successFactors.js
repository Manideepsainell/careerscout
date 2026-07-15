import axios from "axios";

const getSuccessFactorsJobs = async (
  careersUrl,
  categoryId,
  location = "",
  maxJobs
) => {
  let pageNumber = 0;
  let allJobs = [];

  let totalPages = null;
  const pageSize = 10;

  while (true) {
    try {
      
   const response = await axios.post(
  careersUrl,
  {
    locale: "en_US",
    pageNumber,
    sortBy: "postingDate:desc",
    keywords: "",
    location,
    facetFilters: {},
    brand: "",
    categoryId,
    alertId: "",
    rcmCandidateId: "",
    skills: [],
  },{
     headers: { "Content-Type": "application/json" },
  responseType: "text",
  transformResponse: (data) => data,
});


if (pageNumber === 0) {
  console.log(`SF ${careersUrl} status: ${response.status}`);
  console.log(`SF ${careersUrl} first 300 chars:`, response.data.slice(0, 300));
}

const jobs = response.data?.jobSearchResult || [];
      if (totalPages === null) {
        totalPages = Math.ceil(
          (response.data?.totalJobs || 0) /
            pageSize
        );
      }

      if (!jobs.length) {
        break;
      }

      if (maxJobs) {
        const remaining =
          maxJobs - allJobs.length;

        allJobs.push(
          ...jobs.slice(0, remaining)
        );

        if (
          allJobs.length >= maxJobs
        ) {
          break;
        }
      } else {
        allJobs.push(...jobs);
      }

      if (
        pageNumber >= totalPages - 1
      ) {
        break;
      }

      pageNumber++;
   } catch (error) {
  console.log(`SF fetch error for ${careersUrl}: ${error.response?.status || ''} ${error.message}`);
  break;
}
  }

  return allJobs;
};

export default getSuccessFactorsJobs;