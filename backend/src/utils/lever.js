import axios from "axios";

export const getLeverJobs =
  async (companyName) => {
    const response =
      await axios.get(
        `https://api.lever.co/v0/postings/${companyName}?mode=json`
      );

    return response.data;
  };