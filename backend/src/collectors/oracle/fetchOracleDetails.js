import axios from "axios";

const fetchOracleDetails = async (
  job,
  company
) => {

  try {

    const response =
      await axios.get(
        job.detailUrl,
        {
          timeout: 20000,
        }
      );

    const item =
      response.data.items?.[0];

    if (!item) {
      return {};
    }

    return {

      description:
        item.ExternalDescriptionStr || "",

      jobType:
        item.JobSchedule || job.jobType,

      primaryLocation:
        item.PrimaryLocation ||
        job.primaryLocation,

    secondaryLocations:
  (item.secondaryLocations || [])
    .map(location => location.Name)
    .filter(Boolean),
      hasMultipleLocations:
        (item.secondaryLocations?.length || 0) > 0,

    };

  } catch (error) {

    return {};

  }

};

export default fetchOracleDetails;