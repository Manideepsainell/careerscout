import axios from "axios";

const getZohoRecruitJobs = async (
  apiUrl
) => {
  const response = await axios.get(
    apiUrl,
    {
      params: {
        pagename: "Careers",
        source: "CareerSite",
        extra_fields: JSON.stringify([
          "Remote_Job",
        ]),
      },
    }
  );

  return response.data?.data || [];
};

export default getZohoRecruitJobs;