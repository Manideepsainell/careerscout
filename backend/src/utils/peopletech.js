import axios from "axios";
import https from "https";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUxOSwiZmlyc3ROYW1lIjoiQ2FyZWVycyIsImxhc3ROYW1lIjoiQXBwbGljYXRpb24iLCJlbWFpbCI6ImNhcmVlcnNAcGVvcGxldGVjaC5jb20iLCJwaG9uZU51bWJlciI6bnVsbCwiZW1wbG95ZWVDb2RlIjpudWxsLCJjb21wYW55IjoxLCJkZXBhcnRtZW50IjoxLCJvcGVyYXRpb25zIjoxLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJhZG1pbiJ9XSwibG9ja2VkIjpmYWxzZSwiYWN0aXZlIjp0cnVlLCJsZXZlbCI6bnVsbCwibWFuYWdlcklkIjpudWxsLCJpc0N1cnJlbnRNYW5hZ2VyIjpudWxsLCJjcmVhdGVkQnkiOjM1OCwiY3JlYXRlZE9uIjoxNjkzODk3NzQzMzM4LCJtb2RpZmllZEJ5IjozNTgsIm1vZGlmaWVkT24iOjE2OTM4OTc3NDMzMzgsImxvY2F0aW9uIjpudWxsLCJ6aXBDb2RlIjpudWxsLCJwcm9maWxlUGljdHVyZSI6bnVsbCwiaWF0IjoxNzU4ODA1NzEwLCJleHAiOjE3OTAzNDE3MTB9.DyZMb8cB103xgMDaVXKPce3M5pGufL73eb47HsUuevI";

const getPeopleTechJobs = async (
  apiUrl
) => {
  const response =
    await axios.get(
      apiUrl,
      {
        headers: {
          token: TOKEN,
          Accept:
            "application/json, text/plain, */*",
          Origin:
            "https://peopletech.com",
          Referer:
            "https://peopletech.com/",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/149.0.0.0 Safari/537.36",
        },

        httpsAgent:
          new https.Agent({
            rejectUnauthorized:
              false,
          }),
      }
    );

  console.log(
    `Retrieved ${
      response.data?.data?.length ||
      response.data?.length ||
      0
    } jobs`
  );

  return (
    response.data?.data ||
    response.data ||
    []
  );
};

export default getPeopleTechJobs;