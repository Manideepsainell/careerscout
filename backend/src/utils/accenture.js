import axios from "axios";
import FormData from "form-data";
const getAccentureJobs = async (
  careersUrl
) => {

  let startIndex = 0;

  const pageSize = 12;

  let allJobs = [];

  while (true) {

    console.log(
      "START INDEX:",
      startIndex
    );

   const formData = new FormData();

formData.append(
  "startIndex",
  startIndex
);

formData.append(
  "maxResultSize",
  pageSize
);

formData.append(
  "jobKeyword",
  ""
);

formData.append(
  "jobCountry",
  "India"
);

formData.append(
  "jobLanguage",
  "en"
);

formData.append(
  "countrySite",
  "in-en"
);

formData.append(
  "sortBy",
  "2"
);

formData.append(
  "searchType",
  "vectorSearch"
);

formData.append(
  "enableQueryBoost",
  "true"
);

formData.append(
  "minScore",
  "0.6"
);

formData.append(
  "getFeedbackJudgmentEnabled",
  "true"
);

formData.append(
  "useCleanEmbedding",
  "true"
);

formData.append(
  "score",
  "true"
);

formData.append(
  "totalHits",
  "true"
);

formData.append(
  "debugQuery",
  "false"
);

formData.append(
  "jobFilters",
  ""
);

const response =
  await axios.post(
    careersUrl,
    formData,
    {
      headers:
        formData.getHeaders(),
    }
  );
    const jobs =
      response.data?.data || [];

    const totalJobs =
      response.data?.totalHits?.total;

    console.log(
      "TOTAL JOBS:",
      totalJobs
    );
    if (allJobs.length >= 1000) {
  console.log("Safety stop reached");
  break;
}

    console.log(
      `PAGE JOBS: ${jobs.length}`
    );

    if (jobs.length === 0) {
      break;
    }

    allJobs.push(...jobs);

    if (jobs.length < pageSize) {
      break;
    }

    startIndex += pageSize;

    await new Promise(resolve =>
      setTimeout(resolve, 500)
    );
  }

  return allJobs;
};

export default getAccentureJobs;