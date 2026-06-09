
import {
  searchJobs,
  getJobDetails,
} from "../utils/eightfold.js";
const collectEightfoldJobs = async (
  company
) => {
  console.log(
    `Eightfold collector running for ${company.name}`
  );
let allPositions = [];
let start = 0;

while (true) {
  const data = await searchJobs({
    domain: "micron.com",
    start,
  });

  const positions = data.positions;

  if (
    !positions ||
    positions.length === 0
  ) {
    break;
  }

if (start === 0) {
  const details =
    await getJobDetails({
      domain: "micron.com",
      positionId:
  positions[0].atsJobId,
    });

  console.log(
    JSON.stringify(
      details,
      null,
      2
    )
  );

  process.exit(0);
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

      jobUrl: `https://careers.micron.com${job.positionUrl}`,

      description: "",

      postedDate: new Date(
        job.postedTs * 1000
      ),
    })
  );
};

export default collectEightfoldJobs;