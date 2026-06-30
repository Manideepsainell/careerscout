import axios from "axios";

const fetchEightfoldDetails =
  async (job) => {

    try {

      const response =
        await axios.get(
          job.detailUrl,
          {
            timeout: 20000,
          }
        );

      const item =
        response.data.data;

      if (!item) {
        return {};
      }

      return {
  description:
    item.jobDescription || "",

  department:
    item.department || "",

  jobType:
    item.workLocationOption || "",

  primaryLocation:
    item.location || "",

  secondaryLocations:
    item.locations?.slice(1) || [],

  hasMultipleLocations:
    (item.locations?.length || 0) > 1,
};

    } catch {

      return {};

    }

  };

export default fetchEightfoldDetails;