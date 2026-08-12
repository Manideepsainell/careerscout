import axios from "axios";

const isPastEndDate = (endDate) => {
  if (!endDate) return false;

  // Workday observed format: YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
    return false;
  }

  const today = new Date();
  const todayString =
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return endDate < todayString;
};

const hasExplicitExpiryText = (value) => {
  if (!value || typeof value !== "string") {
    return false;
  }

  const text = value.toLowerCase().trim();

  return (
    text.includes("expired") ||
    text.includes("application closed") ||
    text.includes("applications closed") ||
    text.includes("no longer accepting") ||
    text.includes("no longer available") ||
    text.includes("closed for applications")
  );
};

const workdayChecker = async (job) => {
  try {
    // --------------------------------
    // Workday metadata evidence
    // --------------------------------

    if (job.canApply === false) {
      return {
        validity: "DEAD",
        reason: "WORKDAY_CAN_APPLY_FALSE",
        checkedAt: new Date(),
      };
    }

    if (isPastEndDate(job.endDate)) {
      return {
        validity: "DEAD",
        reason: "WORKDAY_END_DATE_PASSED",
        checkedAt: new Date(),
      };
    }

    if (
      hasExplicitExpiryText(
        job.timeLeftToApply
      ) ||
      hasExplicitExpiryText(
        job.jobPostingEndDateAsText
      )
    ) {
      return {
        validity: "DEAD",
        reason: "WORKDAY_EXPLICITLY_EXPIRED",
        checkedAt: new Date(),
      };
    }

    // --------------------------------
    // Existing HTTP validation
    // --------------------------------
const response = await axios.get(
  job.jobUrl,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",

          "Accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",

          "Accept-Language":
            "en-US,en;q=0.9",

          "Accept-Encoding":
            "gzip, deflate, br",

          "Connection":
            "keep-alive",

          "Cache-Control":
            "no-cache",

          "Pragma":
            "no-cache",
        },

        timeout: 20000,
        maxRedirects: 5,
        validateStatus: () => true,
      }
    );

    const { status } = response;

    // --------------------------------
    // Hard HTTP death signals
    // --------------------------------

    if (
      status === 404 ||
      status === 410
    ) {
      return {
        validity: "DEAD",
        reason: `HTTP_${status}`,
        checkedAt: new Date(),
      };
    }

    // --------------------------------
    // Existing baseline
    // --------------------------------

    if (
      status >= 200 &&
      status < 300
    ) {
      return {
        validity: "ALIVE",
        reason: `HTTP_${status}`,
        checkedAt: new Date(),
      };
    }

    return {
      validity: "UNKNOWN",
      reason: `HTTP_${status}`,
      checkedAt: new Date(),
    };

  } catch (error) {
    return {
      validity: "UNKNOWN",
      reason:
        error.code ||
        "NETWORK_ERROR",
      checkedAt: new Date(),
    };
  }
};

export default workdayChecker;