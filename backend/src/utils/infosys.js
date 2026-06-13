import axios from "axios";

const getInfosysJobs = async (
  careersUrl
) => {

  const response =
    await axios.get(
      careersUrl,
      {
        params: {
          sourceId: "1,21",
          searchText: "ALL",
        },
      }
    );

  return response.data || [];
};

export default getInfosysJobs;