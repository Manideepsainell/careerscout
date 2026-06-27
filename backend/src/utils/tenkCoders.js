import axios from "axios";

const get10kCodersJobs = async () => {

  let page = 1;

  const allJobs = [];

  while (true) {

    const response =
      await axios.get(
        "https://10kcoders.com/api/student/jobs/",
        {
          params: {
            student_id: 5961,
            view: "open",
            page,
            page_size: 12,
          },
        }
      );

    const jobs =
      response.data?.data?.items || [];

    

    if (jobs.length === 0) {
      break;
    }

    allJobs.push(...jobs);

    if (
      !response.data?.data?.has_more
    ) {
      break;
    }

    page++;
  }

  return allJobs;
};

export default get10kCodersJobs;