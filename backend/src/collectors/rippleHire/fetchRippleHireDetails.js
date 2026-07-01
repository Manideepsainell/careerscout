import axios from "axios";

const fetchRippleHireDetails =
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
        response.data.jobVO;

      if (!item) {
        return {};
      }

      return {

        description:
          item.jobDesc || "",

        primaryLocation:
          item.locations ||
          item.jobLocation ||
          "",

        secondaryLocations: [],

        hasMultipleLocations:
          false,

        jobType:
          item.jobTypeCustom3 ||
          job.jobType,

      };

    } catch {

      return {};

    }

  };

export default fetchRippleHireDetails;