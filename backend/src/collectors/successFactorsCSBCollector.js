import getSuccessFactorsCSBJobs from "../utils/successFactorsCSB.js";

const collectSuccessFactorsCSBJobs = async (company) => {
  console.log(`CSB collector running for ${company.name}`);

  return getSuccessFactorsCSBJobs(company.openPositionsUrl);
};

export default collectSuccessFactorsCSBJobs;