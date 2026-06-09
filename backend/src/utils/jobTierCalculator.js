const getJobTier = (
  roleCategory,
  eligibilityLevel
) => {

  if (
    ["BACKEND", "FULLSTACK"].includes(
      roleCategory
    ) &&
    [
      "INTERNSHIP",
      "ENTRY_LEVEL",
      "GENERAL",
      "MID_LEVEL",
    ].includes(
      eligibilityLevel
    )
  ) {
    return "TIER_1";
  }

  if (
    roleCategory ===
      "GENERAL_SOFTWARE" &&
    [
      "INTERNSHIP",
      "ENTRY_LEVEL",
      "GENERAL",
      "MID_LEVEL",
    ].includes(
      eligibilityLevel
    )
  ) {
    return "TIER_2";
  }

  if (
    [
      "BACKEND",
      "FULLSTACK",
      "GENERAL_SOFTWARE",
    ].includes(roleCategory) &&
    [
      "SENIOR",
      "STAFF",
      "PRINCIPAL",
      "LEAD",
      "MANAGER",
    ].includes(
      eligibilityLevel
    )
  ) {
    return "TIER_3";
  }

  return "TIER_4";
};

export default getJobTier;