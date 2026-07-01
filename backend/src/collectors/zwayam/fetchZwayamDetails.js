import axios from "axios";

const fetchZwayamDetails = async (job, company) => {
  const jobId = job.externalJobId || job.id;

  const response = await axios.get(
    `${company.openPositionsUrl}/${jobId}`
  );

  const data = response.data || {};

  return {
    description: data.longDescription || "",

    experience:
      data.yrsOfExperience ||
      (data.minYrsOfExperience && data.maxYrsOfExperience
        ? `${data.minYrsOfExperience}-${data.maxYrsOfExperience} Years`
        : ""),

    jobType:
      data.jobType === "J"
        ? "Full Time"
        : "",

    department:
      data.departmentName || "",

    primaryLocation:
      data.location || "",

    secondaryLocations: [],

    hasMultipleLocations: false,

    postedDate:
      data.createdDate
        ? new Date(data.createdDate)
        : null,

    skills:
      data.skillSet || "",
  };
};

export default fetchZwayamDetails;