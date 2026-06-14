const getExperienceBand = (
  title = ""
) => {
  const normalizedTitle = title
    .toLowerCase()
    .replace(/[-–]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // SENIOR
  if (
    normalizedTitle.includes("principal") ||
    normalizedTitle.includes("staff") ||
    normalizedTitle.includes("lead") ||
    normalizedTitle.includes("manager") ||
    normalizedTitle.includes("director") ||
    normalizedTitle.includes("vp") ||
    normalizedTitle.includes("avp") ||
    normalizedTitle.includes("senior") ||
    normalizedTitle.includes("smts") ||
    normalizedTitle.includes("engineer iv") ||
    normalizedTitle.includes("developer iv")
  ) {
    return "SENIOR";
  }

  // MID
  if (
    normalizedTitle.includes("engineer iii") ||
    normalizedTitle.includes("developer iii") ||
    normalizedTitle.includes("software engineer iii") ||
    normalizedTitle.includes("software developer iii") ||
    normalizedTitle.includes("sde 3") ||
    normalizedTitle.includes("mts")
  ) {
    return "MID";
  }

  // JUNIOR
  if (
    normalizedTitle.includes("engineer ii") ||
    normalizedTitle.includes("developer ii") ||
    normalizedTitle.includes("software engineer ii") ||
    normalizedTitle.includes("software developer ii") ||
    normalizedTitle.includes("sde 2")
  ) {
    return "JUNIOR";
  }

  // FRESHER
  if (
    normalizedTitle.includes("intern") ||
    normalizedTitle.includes("trainee") ||
    normalizedTitle.includes("graduate") ||
    normalizedTitle.includes("new college grad") ||
    normalizedTitle.includes("associate") ||
    normalizedTitle.includes("amts") ||
    normalizedTitle.includes("engineer i") ||
    normalizedTitle.includes("developer i") ||
    normalizedTitle.includes("software engineer i") ||
    normalizedTitle.includes("software developer i") ||
    normalizedTitle.includes("sde 1")
  ) {
    return "FRESHER";
  }

  return "UNKNOWN";
};

export default getExperienceBand;