import axios from "axios";

const BASE_URL =
  "http://localhost:5000/api/jobs";

export const getJobs = async (
  filters = {}
) => {

  const response =
    await axios.get(
      BASE_URL,
      {
        params: {

          softwareOnly:
            true,

          sort:
            "latest",

          ...filters,
        },
      }
    );

return response.data;
};