import axios from "axios";

const getKekaJobs = async (
  company
) => {

  // New pattern
  if (company.careersUrl) {

    const response = await axios.get(
      `${company.careersUrl}/api/jobs/default/active`
    );

    return response.data || [];
  }

  // Old pattern
  if (company.companyId) {

    const response = await axios.get(
      `https://hr.keka.com/careers/api/embedjobs/default/active/${company.companyId}`
    );

    return response.data || [];
  }

  return [];
};

export default getKekaJobs;