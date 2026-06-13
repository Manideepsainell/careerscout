import axios from "axios";

const getIbmJobs = async (
  careersUrl
) => {

 try {

  const response =
    await axios.post(
      careersUrl,
     {
  appId: "careers",

  scopes: ["careers2"],

  size: 100,
from: 100,
  lang: "zz",

  sm: {
    query: "",
    lang: "zz",
  },

  query: {
    bool: {
      must: [],
    },
  },

  sort: [
    { _score: "desc" },
    { pageviews: "desc" },
  ],

  _source: [
    "_id",
    "title",
    "url",
    "description",
    "language",
    "entitled",
    "field_keyword_17",
    "field_keyword_08",
    "field_keyword_18",
    "field_keyword_19",
  ],
}
    );
    console.log(
  JSON.stringify(
    response.data,
    null,
    2
  ).slice(0, 5000)
);

  return (
    response.data?.hits?.hits || []
  );

} catch (error) {

  console.log(
    JSON.stringify(
      error.response?.data,
      null,
      2
    )
  );

  throw error;
}
};

export default getIbmJobs;