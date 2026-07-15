import axios from "axios";
import qs from "qs";

const getRippleHireJobs = async (
  careersUrl,
  token
) => {

  let page = 0;
  const pageSize = 10;

  let allJobs = [];

  while (true) {
 const payload = qs.stringify({
  careerSiteUrlParams: JSON.stringify({
    page,
    search: "*:*",
    token,
    source: "CAREERSITE",
    pagesize: pageSize,
    

  }),
  lang: "en"
});
const response = await axios.post(
  careersUrl,
  payload,
  {
    headers: {
      Accept:
        "application/json, text/javascript, */*; q=0.01",

      "Content-Type":
        "application/x-www-form-urlencoded; charset=UTF-8",

      "X-Requested-With":
        "XMLHttpRequest",

      Origin: careersUrl,

      Referer: careersUrl,

      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    },
  }
);

    const jobs =
      response.data?.jobVoList || [];

    if (jobs.length === 0) {
      break;
    }

    allJobs.push(...jobs);
const totalJobs =
  response.data?.totalJobCount || 0;

if (allJobs.length >= totalJobs) {
  break;
}
    

    page++;
  }

  return allJobs;
};

export default getRippleHireJobs;