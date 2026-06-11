import axios from "axios";

export async function searchJobs({
  baseUrl,
  domain,
  start = 0,
}) {
  const response = await axios.get(
    `${baseUrl}/api/pcsx/search`,
    {
      params: {
        domain,
        query: "",
        location: "Hyderabad, TS, India",
filter_distance: 80,
filter_include_remote: 1,
        start,
        sort_by: "hot",
      },
    }
  );

  return response.data.data;
}
export async function getJobDetails({
  baseUrl,
  domain,
  positionId,
}) {
  const response = await axios.get(
    `${baseUrl}/api/pcsx/match_details`,
    {
      params: {
        position_id: positionId,
        domain,
      },
    }
  );
console.log(JSON.stringify(response.data, null, 2));
  return response.data.data;
}