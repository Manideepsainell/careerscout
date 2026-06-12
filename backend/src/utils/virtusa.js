import axios from "axios";

const getVirtusaJobs = async () => {
  const response =
    await axios.post(
      "https://prod.agenticweb-marketing.com/careers/graphql",
      {
        query: `
          query JobListResultsQuery($isList: String!) {
            jobListResults(isList: $isList) {
              results {
                title
                careerCtaLink
                descriptionExternalHTML
                country
                city
                yearsOfExperience
                postedDate
              }
            }
          }
        `,
        variables: {
          isList: "true",
        },
      }
    );

  return (
    response.data?.data
      ?.jobListResults
      ?.results || []
  );
};

export default getVirtusaJobs;