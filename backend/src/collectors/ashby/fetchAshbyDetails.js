import axios from "axios";

const query = `
query ApiJobPosting(
  $organizationHostedJobsPageName: String!,
  $jobPostingId: String!
) {
  jobPosting(
    organizationHostedJobsPageName: $organizationHostedJobsPageName,
    jobPostingId: $jobPostingId
  ) {
    id
    descriptionHtml
    employmentType
    workplaceType
    locationName
    secondaryLocationNames
    compensationTierSummary
  }
}
`;

const fetchAshbyDetails = async (
  job,
  company
) => {
  try {
    const response = await axios.post(
      job.detailUrl,
      {
        operationName:
          "ApiJobPosting",

        variables: {
          organizationHostedJobsPageName:
            company.slug,

          jobPostingId:
            job.externalJobId,
        },

        query,
      },
      {
        headers: {
          "Content-Type":
            "application/json",
        },

        timeout: 20000,
      }
    );

    const item =
      response.data.data?.jobPosting;

    if (!item) {
      return {};
    }

    return {
      description:
        item.descriptionHtml || "",

      jobType:
        item.employmentType || "",

      workplaceType:
        item.workplaceType || "",

      primaryLocation:
        item.locationName || "",

      secondaryLocations:
        item.secondaryLocationNames || [],

      hasMultipleLocations:
        (item.secondaryLocationNames?.length || 0) > 0,

      salary:
        item.compensationTierSummary || "",
    };
  } catch (error) {
    return {};
  }
};

export default fetchAshbyDetails;