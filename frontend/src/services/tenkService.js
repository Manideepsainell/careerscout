import axios from "axios";

export const refresh10kJobs =
  async () => {

    const response =
      await axios.post(
        "http://localhost:5000/api/jobs/refresh-10k"
      );

    return response.data;

};