
import {
  searchJobs,
} from "../utils/eightfold.js";
const collectEightfoldJobs = async (
  company
) => {
  console.log(
    `Eightfold collector running for ${company.name}`
  );
let allPositions = [];
let start = 0;
const baseUrl =
  new URL(company.careersUrl).origin;

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

  console.log(
    `Fetched ${allPositions.length} jobs`
  );

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

      postedDate: new Date(
        job.postedTs * 1000
      ),
    })
  );
};

export default collectEightfoldJobs;