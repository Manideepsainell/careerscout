import detailFetchers from "../details/detailFetchers.js";

const BATCH_SIZE = 20;

const enrichCollectorDetails = async (
  jobs,
  company
) => {

  const fetchDetails =
    detailFetchers[company.jobBoardType];

  if (!fetchDetails) {
    return jobs;
  }

  for (
    let i = 0;
    i < jobs.length;
    i += BATCH_SIZE
  ) {

    const batch =
      jobs.slice(
        i,
        i + BATCH_SIZE
      );
      console.log(
  `Batch ${i / BATCH_SIZE + 1}/${Math.ceil(jobs.length / BATCH_SIZE)}`
);

    await Promise.allSettled(
      batch.map(async (job) => {
        try {
          const details =
            await fetchDetails(
              job,
              company
            );

          Object.assign(
            job,
            details
          );

        } catch (err) {

          console.error(
            `Failed to enrich "${job.title}" (${company.name}): ${err.message}`
          );

        }
      })
    );

  }

  return jobs;
};

export default enrichCollectorDetails;