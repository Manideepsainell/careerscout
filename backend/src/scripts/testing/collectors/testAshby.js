import axios from "axios";

const response = await axios.post(
  "https://jobs.ashbyhq.com/api/non-user-graphql?op=ApiJobBoardWithTeams",
  {
    operationName: "ApiJobBoardWithTeams",
    variables: {
      organizationHostedJobsPageName: "zapier"
    },
    query: `
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
    `
  }
);

console.log(
  JSON.stringify(
    response.data,
    null,
    2
  )
);