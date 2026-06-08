import { searchJobs } from "../utils/eightfold.js";

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

  const positions =
    data.positions;

  if (
    !positions ||
    positions.length === 0
  ) {
    break;
  }

  allPositions.push(
    ...positions
  );

  console.log(
    `Fetched ${allPositions.length} jobs`
  );

  start += 10;
}

console.log(
  `Retrieved ${allPositions.length} jobs`
);

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