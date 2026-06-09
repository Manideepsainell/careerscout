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
    normalizedTitle.includes("engineer iv") ||
    normalizedTitle.includes("developer iv")||
  normalizedTitle.includes("smts")
  ) {
    return "SENIOR";
  }

  // MID
  if (
    normalizedTitle.includes("senior") ||
    normalizedTitle.includes("sr.") ||
    normalizedTitle.includes("sr ") ||
    normalizedTitle.startsWith("sr") ||
    normalizedTitle.includes("engineer iii") ||
    normalizedTitle.includes("developer iii")||
    normalizedTitle.includes("mts")
  ) {
    return "MID";
  }

  // JUNIOR
 if (
  normalizedTitle.includes("engineer ii") ||
  normalizedTitle.includes("developer ii") ||
  normalizedTitle.includes("engineer - ii") ||
  normalizedTitle.includes("developer - ii") ||
  normalizedTitle.includes("sde 2") ||
  normalizedTitle.includes("engineer 2") ||
  normalizedTitle.includes("developer 2")
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
    normalizedTitle.includes("engineer i") ||
    normalizedTitle.includes("developer i") ||
    normalizedTitle.includes("sde 1") ||
    normalizedTitle.includes("engineer 1") ||
    normalizedTitle.includes("developer 1")
  ) {
    return "FRESHER";
  }

  return "UNKNOWN";
};

export default getExperienceBand;