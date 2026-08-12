import axios from "axios";

export default async function greenhouseChecker(job) {
  try {
    const response = await axios.get(job.jobUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",

        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",

        "Accept-Language":
          "en-US,en;q=0.9",
      },

      timeout: 20000,
      maxRedirects: 5,
      validateStatus: () => true,
    });

    const { status } = response;

    // -------------------------
    // Hard HTTP death signals
    // -------------------------

    if (status === 404 || status === 410) {
      return {
        validity: "DEAD",
        reason: `HTTP_${status}`,
        checkedAt: new Date(),
      };
    }

    // -------------------------
    // Successful user-facing URL
    // -------------------------

    if (status >= 200 && status < 300) {
      return {
        validity: "ALIVE",
        reason: `HTTP_${status}`,
        checkedAt: new Date(),
      };
    }

    // -------------------------
    // Everything else
    // -------------------------

    return {
      validity: "UNKNOWN",
      reason: `HTTP_${status}`,
      checkedAt: new Date(),
    };
  } catch (error) {
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
}