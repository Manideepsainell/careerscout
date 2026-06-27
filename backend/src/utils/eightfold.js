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
  location: "India",
  filter_include_remote: 1,
  start,
  sort_by: "hot",
}
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

  return response.data.data;
}