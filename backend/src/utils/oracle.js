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
  company,
  offset = 0
) => {

  const config =
    company.oracleConfig || {};

  const siteNumber =
    config.siteNumber ||
    extractSiteNumber(
      company.openPositionsUrl
    );

  const parsed =
    new URL(
      company.openPositionsUrl
    );

  const finderParams = [
    `siteNumber=${siteNumber}`,
    `limit=${config.limit ?? 25}`,
    `offset=${offset}`,
  ];

  if (config.keyword) {
    finderParams.push(
      `keyword="${config.keyword}"`
    );
  }

  if (config.locationId) {
    finderParams.push(
      `locationId=${config.locationId}`
    );
  }

  if (
    config.selectedLocationsFacet
  ) {
    finderParams.push(
      `selectedLocationsFacet=${config.selectedLocationsFacet}`
    );
  }

  if (config.radius) {
    finderParams.push(
      `radius=${config.radius}`
    );
  }

  if (config.radiusUnit) {
    finderParams.push(
      `radiusUnit=${config.radiusUnit}`
    );
  }

  if (
    config.lastSelectedFacet
  ) {
    finderParams.push(
      `lastSelectedFacet=${config.lastSelectedFacet}`
    );
  }

  if (
    config.selectedPostingDatesFacet
  ) {
    finderParams.push(
      `selectedPostingDatesFacet=${config.selectedPostingDatesFacet}`
    );
  }

  if (
    config.selectedFlexFieldsFacets
  ) {
    finderParams.push(
      `selectedFlexFieldsFacets=${config.selectedFlexFieldsFacets}`
    );
  }

  finderParams.push(
    `sortBy=${
      config.sortBy ||
      "POSTING_DATES_DESC"
    }`
  );

  return `${parsed.origin}/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.workLocation,requisitionList.otherWorkLocations,requisitionList.secondaryLocations,flexFieldsFacet.values,requisitionList.requisitionFlexFields&finder=findReqs;facetsList=LOCATIONS%3BWORK_LOCATIONS%3BWORKPLACE_TYPES%3BTITLES%3BCATEGORIES%3BORGANIZATIONS%3BPOSTING_DATES%3BFLEX_FIELDS,${finderParams.join(",")}`;
};

export {
  extractSiteNumber,
  buildOracleJobsEndpoint,
};