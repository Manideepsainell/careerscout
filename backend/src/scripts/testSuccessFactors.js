import axios from "axios";

const test = async () => {
  const response = await axios.get(
    "https://career55.sapsf.eu/career?company=HCLPRD&career_ns=job_listing_summary"
  );

  console.log(
    response.data.includes("postingCount")
  );
};

test();