import axios from "axios";

const getKekaJobs = async (
  companyId
) => {
  const response =
    await axios.get(
      `https://hr.keka.com/careers/api/embedjobs/default/active/${companyId}`
    );

  return response.data || [];
};

export default getKekaJobs;