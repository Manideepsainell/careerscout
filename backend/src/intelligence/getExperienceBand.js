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
    /\b(principal|staff|lead|manager|director|vp|avp|cto|architect|distinguished|expert|specialist|consultant|fellow|smts)\b/.test(
      normalizedTitle
    ) ||
    /\bsenior\b|\bsr\b|\bsr\./.test(
      normalizedTitle
    ) ||
    /\b(engineer|developer|software engineer|software developer)\s*(iv|v|4|5)\b/.test(
      normalizedTitle
    )
  ) {
    return "SENIOR";
  }

  // MID LEVEL
  if (
    /\b(engineer|developer|software engineer|software developer)\s*(iii|3)\b/.test(
      normalizedTitle
    ) ||
    /\bsde\s*(iii|3)\b/.test(
      normalizedTitle
    ) ||
    /\bmts\b/.test(
      normalizedTitle
    )
  ) {
    return "MID_LEVEL";
  }

  // JUNIOR
  if (
    /\b(engineer|developer|software engineer|software developer)\s*(ii|2)\b/.test(
      normalizedTitle
    ) ||
    /\bsde\s*(ii|2)\b/.test(
      normalizedTitle
    ) ||
    /\bjunior\b/.test(
      normalizedTitle
    )
  ) {
    return "JUNIOR";
  }

  // FRESHER
  if (
    /\bintern(ship)?\b/.test(
      normalizedTitle
    ) ||
    /\b(trainee|graduate|graduate engineer|graduate trainee|associate|campus|campus hire|new college grad|fresher|amts)\b/.test(
      normalizedTitle
    ) ||
    /\b(engineer|developer|software engineer|software developer)\s*(i|1)\b/.test(
      normalizedTitle
    ) ||
    /\bsde\s*(i|1)\b/.test(
      normalizedTitle
    )
  ) {
    return "FRESHER";
  }

  // Default software roles
  if (
    /\b(software engineer|software developer|engineer|developer|programmer|application developer|backend developer|frontend developer|full stack developer)\b/.test(
      normalizedTitle
    )
  ) {
    return "JUNIOR";
  }

  return "UNKNOWN";
};

export default getExperienceBand;