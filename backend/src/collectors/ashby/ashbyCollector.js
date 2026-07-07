import axios from "axios";

const query = `
query ApiJobBoardWithTeams(
  $organizationHostedJobsPageName: String!
) {
  jobBoard: jobBoardWithTeams(
    organizationHostedJobsPageName: $organizationHostedJobsPageName
  ) {
    jobPostings {
      id
      title
      locationName
    }
  }
}
`;

const collectAshbyJobs = async (company) => {
  const slug = company.slug;

  try {
    const response = await axios.post(
      company.openPositionsUrl,
      {
        operationName: "ApiJobBoardWithTeams",

        variables: {
          organizationHostedJobsPageName: slug,
        },

        query,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    const jobs =
      response.data.data?.jobBoard?.jobPostings || [];

   const maxJobs =
  company.ashbyConfig?.maxJobs;

const collectedJobs = maxJobs
  ? jobs.slice(0, maxJobs)
  : jobs;

return collectedJobs.map((job) => ({
  title: job.title,

  company: company._id,

  location:
    job.locationName ||
    "Not Specified",

  source: "ASHBY",

  externalJobId: job.id,

  jobUrl: `https://jobs.ashbyhq.com/${slug}/${job.id}`,

  detailUrl:
    "https://jobs.ashbyhq.com/api/non-user-graphql",

  description: "",

  postedDate: null,
}));

  } catch (error) {

    if (error.response?.status === 429) {
      console.log(
        `Ashby rate limited: ${company.name}`
      );
      return [];
    }

    throw error;
  }
};

export default collectAshbyJobs;