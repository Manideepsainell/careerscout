import {
  searchJobs,
} from "../../utils/eightfold.js";


const collectEightfoldJobs = async (
  company
) => {

  let allPositions = [];
  let start = 0;

  const baseUrl =
    company.careersUrl
      ? new URL(
          company.careersUrl
        ).origin
      : `https://${company.domain.split(".")[0]}.eightfold.ai`;

  while (true) {

    const data =
      await searchJobs({
        baseUrl,
        domain: company.domain,
        start,
      });

    const positions =
      data.positions || [];

    if (!positions.length) {
      break;
    }

   const maxJobs =
  company.eightfoldConfig?.maxJobs;

if (maxJobs) {
  const remaining =
    maxJobs - allPositions.length;

  allPositions.push(
    ...positions.slice(0, remaining)
  );

  if (allPositions.length >= maxJobs) {
    break;
  }
} else {
  allPositions.push(...positions);
}

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
        String(job.id),

      jobUrl:
        `${baseUrl}${job.positionUrl}`,

      detailUrl:
        `${baseUrl}/api/pcsx/position_details?position_id=${job.id}&domain=${company.domain}&hl=en`,

      description: "",

      postedDate:
        job.postedTs
          ? new Date(job.postedTs * 1000)
          : null,
    })
  );
};

export default collectEightfoldJobs;