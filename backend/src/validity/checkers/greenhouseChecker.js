import axios from "axios";

export default async function greenhouseChecker(job) {
  try {
 const response = await axios.get(job.detailUrl, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
  },
});


    if (response.status === 200) {
      return {
        validity: "ALIVE",
        reason: "HTTP_200",
        checkedAt: new Date(),
      };
    }

    if (response.status === 404 || response.status === 410) {
      return {
        validity: "DEAD",
        reason: `HTTP_${response.status}`,
        checkedAt: new Date(),
      };
    }

    return {
      validity: "UNKNOWN",
      reason: `HTTP_${response.status}`,
      checkedAt: new Date(),
    };
  } 
  catch (error) {
  const status = error.response?.status;

  if (status) {
    return {
      validity: "UNKNOWN",
      reason: `HTTP_${status}`,
      checkedAt: new Date(),
    };
  }

  return {
    validity: "UNKNOWN",
    reason: error.code || "UNKNOWN_ERROR",
    checkedAt: new Date(),
  };
}
  console.log("Status:", error.response?.status);
  console.log("Headers:", error.response?.headers);
  console.log("Data:", error.response?.data);



    return {
      validity: "UNKNOWN",
      reason: error.code || "UNKNOWN_ERROR",
      checkedAt: new Date(),
    };
  }
