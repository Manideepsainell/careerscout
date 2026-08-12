import axios from "axios";
const parseWorkdayEndDate = (endDate) => {
  if (
    !endDate ||
    !/^\d{4}-\d{2}-\d{2}$/.test(endDate)
  ) {
    return null;
  }

  const [year, month, day] =
    endDate.split("-").map(Number);

  return new Date(
    year,
    month - 1,
    day
  );
};

const getApplicationUrgency = (
  timeLeftToApply
) => {
  if (
    !timeLeftToApply ||
    typeof timeLeftToApply !== "string"
  ) {
    return "UNKNOWN";
  }

  const text =
    timeLeftToApply.toLowerCase();

  if (text.includes("hour")) {
    return "URGENT";
  }

  const dayMatch =
    text.match(/(\d+)\s+day/);

  if (!dayMatch) {
    if (text.includes("30+ days")) {
      return "OPEN";
    }

    return "UNKNOWN";
  }

  const days = Number(dayMatch[1]);

  if (days <= 3) {
    return "SOON";
  }

  return "OPEN";
};
const fetchWorkdayDetails = async (
  job,
  company
) => {
  try {
    const response = await axios.get(
      job.detailUrl,
      {
        timeout: 20000,
      }
    );

    const info =
      response.data.jobPostingInfo;

    return {
      description:
        info.jobDescription || "",

      jobType:
        info.timeType ||
        job.jobType,

      primaryLocation:
        info.location ||
        job.primaryLocation,

      secondaryLocations:
        info.additionalLocations || [],

      hasMultipleLocations:
        (info.additionalLocations?.length || 0) > 0,

      // -------------------------
      // Workday metadata
      // -------------------------

      canApply:
        info.canApply,

      endDate:
        info.endDate,

      timeLeftToApply:
        info.timeLeftToApply,

      jobPostingEndDateAsText:
        info.jobPostingEndDateAsText,

      posted:
        info.posted,

      startDate:
        info.startDate,
        applicationDeadline:
  parseWorkdayEndDate(
    info.endDate
  ),

applicationUrgency:
  getApplicationUrgency(
    info.timeLeftToApply
  ),
    };
  } catch (error) {
    return {};
  }
};

export default fetchWorkdayDetails;