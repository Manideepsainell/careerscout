import axios from "axios";

const getIbmJobs = async (careersUrl) => {
  try {
    let from = 0;
    const size = 100;

    let allJobs = [];

    while (true) {
      const response = await axios.post(careersUrl, {
        appId: "careers",

        scopes: ["careers2"],

        size,
        from,

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
          { dcdate: "desc" },
          { _score: "desc" },
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
          "dcdate",
        ],
      });

      const jobs =
        response.data?.hits?.hits || [];

      const totalJobs =
        response.data?.hits?.total?.value || 0;

      if (!jobs.length) {
        break;
      }

      allJobs.push(...jobs);

     

      if (
        allJobs.length >= totalJobs
      ) {
        break;
      }

      from += size;
    }

    return allJobs;

  } catch (error) {

   

    throw error;
  }
};

export default getIbmJobs;