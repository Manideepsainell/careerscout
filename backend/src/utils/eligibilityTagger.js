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

  // MANAGER
  if (
    normalizedTitle.includes("manager") ||
    normalizedTitle.includes("director") ||
    normalizedTitle.includes("head") ||
    normalizedTitle.includes("vp") ||
    normalizedTitle.includes("avp") ||
    normalizedTitle.includes("vice president") ||
    normalizedTitle.includes("assistant vice president") ||
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
    normalizedTitle.includes("senior") ||
    normalizedTitle.includes("sr.") ||
    normalizedTitle.includes("sr ") ||
    normalizedTitle.startsWith("sr") ||
    normalizedTitle.includes("engineer iv") ||
    normalizedTitle.includes("developer iv") ||
    normalizedTitle.includes("software engineer iv") ||
    normalizedTitle.includes("software developer iv") ||
    normalizedTitle.includes("smts")
  ) {
    return "SENIOR";
  }

  // MID LEVEL
  if (
    normalizedTitle.includes("engineer iii") ||
    normalizedTitle.includes("developer iii") ||
    normalizedTitle.includes("software engineer iii") ||
    normalizedTitle.includes("software developer iii") ||
    normalizedTitle.includes("engineer ii") ||
    normalizedTitle.includes("developer ii") ||
    normalizedTitle.includes("software engineer ii") ||
    normalizedTitle.includes("software developer ii") ||
    normalizedTitle.includes("sde 2") ||
    normalizedTitle.includes("sde 3") ||
    normalizedTitle.includes("mts")
  ) {
    return "MID_LEVEL";
  }

  // ENTRY LEVEL
  if (
    normalizedTitle.includes("engineer i") ||
    normalizedTitle.includes("developer i") ||
    normalizedTitle.includes("software engineer i") ||
    normalizedTitle.includes("software developer i") ||
    normalizedTitle.includes("sde 1") ||
    normalizedTitle.includes("associate") ||
    normalizedTitle.includes("graduate") ||
    normalizedTitle.includes("new college grad") ||
    normalizedTitle.includes("trainee") ||
    normalizedTitle.includes("amts")
  ) {
    return "ENTRY_LEVEL";
  }

  return "GENERAL";
};

export default getEligibilityLevel;