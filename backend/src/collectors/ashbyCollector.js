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
  console.log(
    `Ashby collector running for ${company.name}`
  );

  const slug = company.slug;

  const response = await axios.post(
    company.openPositionsUrl,
    {
      operationName:
        "ApiJobBoardWithTeams",

      variables: {
        organizationHostedJobsPageName:
          slug,
      },

      query,
    },
    {
      headers: {
        "Content-Type":
          "application/json",
      },
    }
  );

  const jobs =
    response.data.data?.jobBoard
      ?.jobPostings || [];

  console.log(
    `${jobs.length} jobs found`
  );

  return jobs.map((job) => ({
    title: job.title,

    company: company._id,

    location:
      job.locationName ||
      "Not Specified",

    source: "ASHBY",

    externalJobId:
      job.id,

    jobUrl: `https://jobs.ashbyhq.com/${slug}/${job.id}`,

    description: "",

    postedDate: null,
  }));
};

export default collectAshbyJobs;