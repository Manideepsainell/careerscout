const extractSiteNumber = (
  openPositionsUrl
) => {
  const match =
    openPositionsUrl.match(
      /\/sites\/([^/]+)\//
    );

  return match?.[1];
};
const buildOracleJobsEndpoint = (
  openPositionsUrl,
  offset = 0
) => {
  const siteNumber =
    extractSiteNumber(
      openPositionsUrl
    );

  const parsed =
    new URL(openPositionsUrl);

  return `${parsed.origin}/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.workLocation,requisitionList.otherWorkLocations,requisitionList.secondaryLocations,flexFieldsFacet.values,requisitionList.requisitionFlexFields&finder=findReqs;siteNumber=${siteNumber},limit=200,offset=${offset}`;
};

export {
  extractSiteNumber,
  buildOracleJobsEndpoint,
};