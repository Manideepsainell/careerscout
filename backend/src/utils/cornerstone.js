import axios from "axios";

export async function searchJobs({
  careerSiteId,
  careerSitePageId,
  pageNumber = 1,
}) {
  const token = await getToken();

  const response = await axios.post(
    "https://us-galaxy.api.csod.com/rec-job-search/external/jobs",
    {
      careerSiteId,
      careerSitePageId,

      pageNumber,
      pageSize: 25,

      cultureId: 1,
      cultureName: "en-US",

      searchText: "",

      countryCodes: ["in"],

      postingsWithinDays: 30,

      cities: [],
      states: [],
      placeID: "",

      customFieldCheckboxKeys: [],
      customFieldDropdowns: [],
      customFieldRadios: [],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}

export async function getToken() {
  const response = await axios.get(
    "https://cornerstone.csod.com/ux/ats/careersite/2/home"
  );

  const match = response.data.match(
    /"token":\s*"([^"]+)"/
  );

  return match?.[1];
}