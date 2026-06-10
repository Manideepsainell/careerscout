import axios from "axios";

const API_URL =
  "http://localhost:5000/api/jobs?experienceBand=FRESHER&softwareOnly=true";

export const getJobs = async () => {
  const response =
    await axios.get(API_URL);

  return response.data.data;
};