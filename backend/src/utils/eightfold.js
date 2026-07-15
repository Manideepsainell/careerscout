import axios from "axios";
import https from "https";
const agent = new https.Agent({
  family: 4,
});
export async function searchJobs({
  baseUrl,
  domain,
  start = 0,
}) {
  try {
 const response = await axios.get(
  `${baseUrl}/api/pcsx/search`,
  {
    httpsAgent: agent,
    timeout: 30000,
    params: {
      domain,
      query: "",
      location: "",
      start,
      sort_by: "timestamp",
    },
  }
);



    return response.data.data;

  } catch (error) {
    if (error.response?.status === 403) {
      console.log(`403 blocked: ${domain}`);
      return { positions: [] };
    }

    throw error;
  }
}