import axios from "axios";

const test = async () => {
  const response = await axios.post(
    "https://browserstack.wd3.myworkdayjobs.com/wday/cxs/browserstack/External/jobs",
    {
      limit: 20,
      offset: 0,
    }
  );

  console.log(response.data.total);

  console.log(response.data.jobPostings[0]);
};

test();