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
    normalizedTitle.includes("sr.") ||
normalizedTitle.includes("sr ") ||
    normalizedTitle.includes("smts") ||
    normalizedTitle.includes("engineer iv") ||
    normalizedTitle.includes("developer iv")||
    normalizedTitle.includes("distinguished") ||
normalizedTitle.includes("architect") ||
normalizedTitle.includes("cto") ||
normalizedTitle.includes("developer 4") ||
normalizedTitle.includes("developer 5") ||
normalizedTitle.includes("engineer 4") ||
normalizedTitle.includes("engineer 5") ||
normalizedTitle.includes("software developer 4") ||
normalizedTitle.includes("software developer 5")
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
    normalizedTitle.includes("mts")||
    normalizedTitle.includes("developer 3") ||
normalizedTitle.includes("engineer 3") ||
normalizedTitle.includes("software developer 3") ||
normalizedTitle.includes("software engineer 3")
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
if (
  normalizedTitle.includes("engineer") ||
  normalizedTitle.includes("developer") ||
  normalizedTitle.includes("programmer")
) {
  return "JUNIOR";
}
  return "UNKNOWN";
};

export default getExperienceBand;