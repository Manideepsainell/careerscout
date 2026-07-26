import axios from "axios";

const workdayChecker = async (job) => {
  try {
    await axios.get(job.detailUrl, {
      timeout: 10000,
    });

    return {
      validity: "ALIVE",
      reason: "HTTP_200",
      checkedAt: new Date(),
    };
  } catch (error) {
    const status = error.response?.status;

    if (status === 404 || status === 410) {
      return {
        validity: "DEAD",
        reason: `HTTP_${status}`,
        checkedAt: new Date(),
      };
    }

    return {
      validity: "UNKNOWN",
      reason: status
        ? `HTTP_${status}`
        : error.code || "NETWORK_ERROR",
      checkedAt: new Date(),
    };
  }
};

export default workdayChecker;