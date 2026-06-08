const buildSmartRecruitersEndpoint = (
  careersUrl
) => {
  const slug =
    careersUrl.split("/").pop();

  return `https://api.smartrecruiters.com/v1/companies/${slug}/postings`;
};

export {
  buildSmartRecruitersEndpoint,
};