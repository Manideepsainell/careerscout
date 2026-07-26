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
             excludeSenior: true,

          ...filters,
        },
      }
    );
console.log(response);
return response.data;
};

export const markApplied =
  async (jobId) => {

    const response =
      await axios.patch(
        `${BASE_URL}/${jobId}/apply`
      );

    return response.data;
};
export const markExpired =
  async (jobId) => {

    const response =
      await axios.patch(
        `${BASE_URL}/${jobId}/expire`
      );

    return response.data;
};