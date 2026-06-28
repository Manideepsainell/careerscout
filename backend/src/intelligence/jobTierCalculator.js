const getJobTier = (
  roleCategory,
  eligibilityLevel
) => {

  // Best fit
  if (
    [
      "BACKEND",
      "FULLSTACK",
    ].includes(roleCategory) &&
    [
      "INTERNSHIP",
      "ENTRY_LEVEL",
      "GENERAL",
      "MID_LEVEL",
    ].includes(eligibilityLevel)
  ) {
    return "TIER_1";
  }

  // Very good fit
  if (
    [
      "GENERAL_SOFTWARE",
      "FRONTEND",
      "AI_ML",
      "MOBILE",
    ].includes(roleCategory) &&
    [
      "INTERNSHIP",
      "ENTRY_LEVEL",
      "GENERAL",
      "MID_LEVEL",
    ].includes(eligibilityLevel)
  ) {
    return "TIER_2";
  }

  // Relevant but senior
  if (
    [
      "BACKEND",
      "FULLSTACK",
      "GENERAL_SOFTWARE",
      "FRONTEND",
      "AI_ML",
      "MOBILE",
    ].includes(roleCategory) &&
    [
      "SENIOR",
      "STAFF",
      "PRINCIPAL",
      "LEAD",
      "MANAGER",
    ].includes(eligibilityLevel)
  ) {
    return "TIER_3";
  }

  return "TIER_4";
};

export default getJobTier;