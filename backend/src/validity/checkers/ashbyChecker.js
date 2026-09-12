import axios from "axios";

const ASHBY_DETAIL_QUERY = `
  query ApiJobPosting(
    $organizationHostedJobsPageName: String!,
    $jobPostingId: String!
  ) {
    jobPosting(
      organizationHostedJobsPageName: $organizationHostedJobsPageName,
      jobPostingId: $jobPostingId
    ) {
      id
    }
  }
`;

const ashbyChecker = async (job) => {
  try {
    if (!job.detailUrl || !job.externalJobId) {
      return {
        validity: "UNKNOWN",
        reason: "MISSING_ASHBY_DETAIL_DATA",
        checkedAt: new Date(),
      };
    }

    const companySlug = job.jobUrl
      ?.split("jobs.ashbyhq.com/")[1]
      ?.split("/")[0];

    if (!companySlug) {
      return {
        validity: "UNKNOWN",
        reason: "MISSING_ASHBY_COMPANY_SLUG",
        checkedAt: new Date(),
      };
    }

    const response = await axios.post(
      job.detailUrl,
      {
        operationName: "ApiJobPosting",

        variables: {
          organizationHostedJobsPageName:
            companySlug,

          jobPostingId:
            job.externalJobId,
        },

        query: ASHBY_DETAIL_QUERY,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },

        timeout: 20000,

        validateStatus: () => true,
      }
    );

    const { status, data } = response;

    // -------------------------
    // Hard HTTP death signals
    // -------------------------

    if (
      status === 404 ||
      status === 410
    ) {
      return {
        validity: "DEAD",
        reason: `HTTP_${status}`,
        checkedAt: new Date(),
      };
    }

    // -------------------------
    // HTTP/API uncertainty
    // -------------------------

    if (
      status < 200 ||
      status >= 300
    ) {
      return {
        validity: "UNKNOWN",
        reason: `HTTP_${status}`,
        checkedAt: new Date(),
      };
    }

    // -------------------------
    // Ashby job existence
    // -------------------------

    const jobPosting =
      data?.data?.jobPosting;

    if (!jobPosting) {
      return {
        validity: "DEAD",
        reason:
          "ASHBY_JOB_POSTING_NOT_FOUND",
        checkedAt: new Date(),
      };
    }

    // -------------------------
    // Job exists
    // -------------------------

    return {
      validity: "ALIVE",
      reason:
        "ASHBY_JOB_POSTING_FOUND",
      checkedAt: new Date(),
    };
  } catch (error) {
    return {
      validity: "UNKNOWN",
      reason:
        error.code ||
        "ASHBY_VALIDATION_ERROR",
      checkedAt: new Date(),
    };
  }
};

export default ashbyChecker;