import axios from "axios";

const getSuccessFactorsJobs = async (
  careersUrl,
  categoryId
) => {
  let pageNumber = 0;
  let allJobs = [];

  while (true) {
    try {
      console.log(
        "REQUEST PAGE:",
        pageNumber
      );

      const response =
        await axios.post(
          careersUrl,
          {
            locale: "en_US",
            pageNumber,
            sortBy: "",
            keywords: "",
            location: "",
            facetFilters: {},
            brand: "",
            categoryId,
            alertId: "",
            rcmCandidateId: "",
            skills: [],
          }
        );

      const jobs =
        response.data?.jobSearchResult || [];

      console.log(
        "RESPONSE PAGE:",
        pageNumber,
        jobs.length
      );

      if (jobs.length === 0) {
        break;
      }

      allJobs.push(...jobs);
   await new Promise(resolve =>
  setTimeout(resolve, 1000)
);
      pageNumber++;
    } catch (error) {
      console.log(
        "FAILED PAGE:",
        pageNumber
      );

      console.log(
        error.response?.data
      );

      console.log(
  `Stopped at page ${pageNumber}`
);

break;
    }
  }

  return allJobs;
};

export default getSuccessFactorsJobs;