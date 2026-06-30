import fetchWorkdayDetails from "../workday/fetchWorkdayDetails.js";

const enrichCollectorDetails = async (
  jobs,
  company
) => {

  if (company.jobBoardType !== "WORKDAY") {
    return jobs;
  }

  for (const job of jobs) {

    const details =
      await fetchWorkdayDetails(
        job,
        company
      );

    Object.assign(
      job,
      details
    );
  }

  return jobs;
};

export default enrichCollectorDetails;