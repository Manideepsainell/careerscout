const getEligibilityLevel = (
  title = ""
) => {
  const normalizedTitle =
    title.toLowerCase();

  // PRINCIPAL
  if (
    normalizedTitle.includes("principal") ||
    normalizedTitle.includes("pmts")
  ) {
    return "PRINCIPAL";
  }

  // STAFF
  if (
    normalizedTitle.includes("staff")
  ) {
    return "STAFF";
  }

  // LEAD
  if (
    normalizedTitle.includes("lead")
  ) {
    return "LEAD";
  }

  // MANAGER / DIRECTOR / VP
  if (
    normalizedTitle.includes("manager") ||
    normalizedTitle.includes("director") ||
    normalizedTitle.includes("head") ||
    normalizedTitle.includes("vp") ||
    normalizedTitle.includes("avp") ||
    normalizedTitle.includes("vice president") ||
    normalizedTitle.includes(
      "assistant vice president"
    ) ||
    normalizedTitle.includes("rvp")
  ) {
    return "MANAGER";
  }

  // INTERNSHIP
  if (
    normalizedTitle.includes("intern")
  ) {
    return "INTERNSHIP";
  }

  // SENIOR
  if (
    normalizedTitle.includes("engineer iv") ||
    normalizedTitle.includes("developer iv") ||
    normalizedTitle.includes("senior") ||
    normalizedTitle.includes("sr.") ||
    normalizedTitle.includes("sr ") ||
    normalizedTitle.startsWith("sr") ||
    normalizedTitle.includes("smts")
  ) {
    return "SENIOR";
  }

  // MID LEVEL
  if (
    normalizedTitle.includes("engineer iii") ||
    normalizedTitle.includes("developer iii") ||
    normalizedTitle.includes("engineer ii") ||
    normalizedTitle.includes("developer ii") ||
    normalizedTitle.includes("sw engineer ii") ||
    normalizedTitle.includes("sw engineer iii") ||
    normalizedTitle.includes("engineer 2") ||
    normalizedTitle.includes("developer 2") ||
    normalizedTitle.includes("sde 2") ||
    normalizedTitle.includes("engineer 3") ||
    normalizedTitle.includes("developer 3") ||
    normalizedTitle.includes("sde 3") ||
    normalizedTitle.includes("mts")||
        normalizedTitle.includes("engineer - ii")||
normalizedTitle.includes("engineer-ii")||
normalizedTitle.includes("engineer - iii")||
normalizedTitle.includes("engineer-iiI")||
normalizedTitle.includes("engineer - iv")||
normalizedTitle.includes("engineer-iv")||
normalizedTitle.includes("sde 2")||
normalizedTitle.includes("software development engineer ii")||
normalizedTitle.includes("software development engineer - ii")
  ) {
    return "MID_LEVEL";
  }

  // ENTRY LEVEL
  if (
    normalizedTitle.includes("engineer i") ||
    normalizedTitle.includes("developer i") ||
    normalizedTitle.includes("sw engineer i") ||
    normalizedTitle.includes("engineer 1") ||
    normalizedTitle.includes("developer 1") ||
    normalizedTitle.includes("sde 1") ||
    normalizedTitle.includes("associate") ||
    normalizedTitle.includes("graduate") ||
    normalizedTitle.includes(
      "new college grad"
    ) ||
    normalizedTitle.includes("trainee") ||
    normalizedTitle.includes("amts")

  ) {
    return "ENTRY_LEVEL";
  }

  return "GENERAL";
};

export default getEligibilityLevel;