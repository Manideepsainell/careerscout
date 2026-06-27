
import {
  searchJobs,
} from "../utils/eightfold.js";
const collectEightfoldJobs = async (
  company
) => {
  
let allPositions = [];
let start = 0;
const baseUrl =
  company.careersUrl
    ? new URL(company.careersUrl).origin
    : `https://${company.domain.split(".")[0]}.eightfold.ai`;

while (true) {
 const data = await searchJobs({
  baseUrl,
  domain: company.domain,
  start,
});
  const positions = data.positions;

  if (
    !positions ||
    positions.length === 0
  ) {
    break;
  }

  allPositions.push(...positions);



  start += 10;
}
 return allPositions.map(
    (job) => ({
      title: job.name,

      company: company._id,

      location:
        job.locations?.join(", ") ||
        "Not Specified",

      source: "EIGHTFOLD",

      externalJobId:
        job.atsJobId,

      jobUrl: `${baseUrl}${job.positionUrl}`,

      description: "",

     postedDate:
  job.postedTs
    ? new Date(job.postedTs * 1000)
    : null,
    })
  );
};

export default collectEightfoldJobs;