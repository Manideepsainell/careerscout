const getExperienceBand = (
  title = "",
  description = ""
) => {
 const normalizedTitle = title
  .toLowerCase()
  .replace(/\s+/g, " ")
  .trim();

const normalizedDescription = description
  .toLowerCase()
  .replace(/\s+/g, " ")
  .trim();

  // Explicit years of experience.
  // Description is used ONLY for explicit YOE signals.
  const experienceText = `${normalizedTitle} ${normalizedDescription}`;

  // 8+ years / 8-15 years / 8 to 15 years → SENIOR
  if (
    /\b(?:8|9|10|11|12|13|14|15)\s*(?:\+|to|-)\s*\d*\s*(?:years?|yrs?|yoe)\b/.test(
      experienceText
    )
  ) {
    return "SENIOR";
  }

  // 3-7 years / 3 to 7 years → MID_LEVEL
  if (
    /\b[3-7]\s*(?:\+|to|-)\s*\d*\s*(?:years?|yrs?|yoe)\b/.test(
      experienceText
    )
  ) {
    return "MID_LEVEL";
  }

  // Single explicit requirement: 8+ years → SENIOR
  if (
    /\b(?:8|9|10|11|12|13|14|15)\s*\+\s*(?:years?|yrs?|yoe)\b/.test(
      experienceText
    )
  ) {
    return "SENIOR";
  }

  // Single explicit requirement: 3+ years → MID_LEVEL
  if (
    /\b[3-7]\s*\+\s*(?:years?|yrs?|yoe)\b/.test(
      experienceText
    )
  ) {
    return "MID_LEVEL";
  }

  // SENIOR based on title
  if (
    /\b(principal|staff|lead|director|vp|avp|cto|architect|distinguished|expert|fellow|smts)\b/.test(
      normalizedTitle
    ) ||
    /\b(engineering manager|software engineering manager|development manager|technical manager|engineering director)\b/.test(
      normalizedTitle
    ) ||
    /\bsenior\b|\bsr\b|\bsr\.\b/.test(
      normalizedTitle
    ) ||
    /\b(engineer|developer|software engineer|software developer)\s+(iv|v|4|5)\b/.test(
      normalizedTitle
    )
  ) {
    return "SENIOR";
  }

  // MID LEVEL
if (
  /\b(engineer|developer|software engineer|software developer)\s+(iii|3)\b/.test(
    normalizedTitle
  ) ||
  /\bsde\s+(iii|3)\b/.test(
    normalizedTitle
  ) ||
  /\bmts\b/.test(
    normalizedTitle
  )
) {
  return "MID_LEVEL";
}
// Mixed level range: II/III
if (
  /\b(?:engineer|developer)\s*-?\s*(?:ii|2)\s*\/\s*(?:iii|3)\b/.test(
    normalizedTitle
  ) ||
  /\bsde\s*-?\s*(?:ii|2)\s*\/\s*(?:iii|3)\b/.test(
    normalizedTitle
  )
) {
  return "MID_LEVEL";
}
  // JUNIOR
if (
  /\b(engineer|developer|software engineer|software developer)\s+(ii|2)\b/.test(
    normalizedTitle
  ) ||
  /\bsde\s+(ii|2)\b/.test(
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
    /\b(engineer|developer|software engineer|software developer)\s+(i|1)\b/.test(
      normalizedTitle
    ) ||
    /\bsde\s+(i|1)\b/.test(
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