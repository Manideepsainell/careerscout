import axios from "axios";

const fetchWorkdayDetails = async (
  job,
  company
) => {

  try {

    const response =
      await axios.get(job.detailUrl, {
        timeout: 20000,
      });
    


const start = Date.now();

    const info =
      response.data.jobPostingInfo;

    return {
      description:
        info.jobDescription || "",

      jobType:
        info.timeType || job.jobType,

      primaryLocation:
        info.location || job.primaryLocation,

      secondaryLocations:
        info.additionalLocations || [],

      hasMultipleLocations:
        (info.additionalLocations?.length || 0) > 0,
    };

  } catch (error) {

  

  return {};
}
};

export default fetchWorkdayDetails;