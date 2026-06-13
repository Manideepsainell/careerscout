const buildOracleJobsEndpoint = (
  openPositionsUrl,
  offset = 0
) => {
  return `${openPositionsUrl}?onlyData=true&expand=requisitionList.workLocation,requisitionList.otherWorkLocations,requisitionList.secondaryLocations,flexFieldsFacet.values,requisitionList.requisitionFlexFields&finder=findReqs;siteNumber=CX_1,limit=200,offset=${offset}`;
};

export {
  buildOracleJobsEndpoint,
};