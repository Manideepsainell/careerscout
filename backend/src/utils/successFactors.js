import axios from "axios";

const getSuccessFactorsJobs = async (
  careersUrl,
  categoryId,
  location = ""
) =>  {
  let pageNumber = 0;
  let allJobs = [];
let totalPages = null;
const pageSize = 10;
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
            location,
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
if (totalPages === null) {
  totalPages = Math.ceil(
    (response.data?.totalJobs || 0) /
    pageSize
  );

  console.log(
    `Total Jobs: ${response.data?.totalJobs}`
  );

  console.log(
    `Total Pages: ${totalPages}`
  );
}
      console.log(
        "RESPONSE PAGE:",
        pageNumber,
        jobs.length
      );

   if (jobs.length === 0) {
  break;
}

allJobs.push(...jobs);

if (pageNumber >= totalPages - 1) {
  console.log(
    "Reached last page"
  );

  break;
}

pageNumber++;

  
    } catch (error) {
      console.log(
        "FAILED PAGE:",
        pageNumber
      );

     console.dir(error.response?.data, {
  depth: null
});

      console.log(
  `Stopped at page ${pageNumber}`
);

break;
    }
  }

  return allJobs;
};

export default getSuccessFactorsJobs;