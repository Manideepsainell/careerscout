import axios from "axios";

export async function searchJobs({
  domain,
  start = 0,
}) {
  const response = await axios.get(
    "https://micron.eightfold.ai/api/pcsx/search",
    {
      params: {
        domain,
        query: "",
        location: "",
        start,
        sort_by: "hot",
      },
    }
  );

  return response.data.data;
}
export async function getJobDetails({
  domain,
  positionId,
}) {
  const response = await axios.get(
    "https://micron.eightfold.ai/api/pcsx/match_details",
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