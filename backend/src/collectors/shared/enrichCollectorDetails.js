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

    await Promise.all(

      batch.map(async (job) => {

        const details =
          await fetchDetails(
            job,
            company
          );

        Object.assign(
          job,
          details
        );

      })

    );

  }

  return jobs;
};

export default enrichCollectorDetails;