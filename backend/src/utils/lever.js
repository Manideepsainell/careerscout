import axios from "axios";

export const getLeverJobs = async (companyName) => {
  try {
    const response = await axios.get(
      `https://api.lever.co/v0/postings/${companyName}?mode=json`
    );

    return response.data;
  } catch (error) {
    console.log("\nLever API failed");
    console.log("Slug:", companyName);
    console.log("Status:", error.response?.status);
    console.log("Message:", error.message);
    console.dir(error.response?.data, { depth: null });

    throw error;
  }
};