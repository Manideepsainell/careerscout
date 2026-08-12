const getEligibilityLevel = (
  title = ""
) => {
  const normalizedTitle =
    title.toLowerCase();

  // INTERNSHIP
  if (
    /\bintern(ship)?\b/.test(
      normalizedTitle
    )
  ) {
    return "INTERNSHIP";
  }

  // PRINCIPAL
  if (
    /\b(principal|fellow|pmts)\b/.test(
      normalizedTitle
    )
  ) {
    return "PRINCIPAL";
  }

  // STAFF
  if (
    /\b(staff|smts)\b/.test(
      normalizedTitle
    )
  ) {
    return "STAFF";
  }

  // LEAD
  if (
    /\b(lead|technical lead|team lead)\b/.test(
      normalizedTitle
    )
  ) {
    return "LEAD";
  }
   // MANAGER
  if (
    /\b(manager|director|head|vice president|assistant vice president|vp|avp|rvp)\b/.test(
      normalizedTitle
    )
  ) {
    return "MANAGER";
  }
  // Associate roles without an explicit entry-level technical/business title
if (
  /\bassociate\b/.test(normalizedTitle) &&
  !/\b(software engineer|software developer|engineer|developer|sde|account executive)\b/.test(
    normalizedTitle
  )
) {
  return "GENERAL";
}
  // ENTRY LEVEL
  if (
    /\b(engineer|developer|software engineer|software developer)\s*(i|1)\b/.test(
      normalizedTitle
    ) ||
    /\bsde\s*(i|1)\b/.test(
      normalizedTitle
    ) ||
    /\b(associate|graduate|graduate engineer|graduate trainee|campus|campus hire|fresher|entry level|entry-level|junior|trainee|amts)\b/.test(
      normalizedTitle
    )
  ) {
    return "ENTRY_LEVEL";
  }

 

  // SENIOR
  if (
    /\b(senior|architect|distinguished|expert)\b/.test(
      normalizedTitle
    ) ||
    /\bsr\b|\bsr\./.test(
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
    /\b(engineer|developer|software engineer|software developer)\s*(ii|iii|2|3)\b/.test(
      normalizedTitle
    ) ||
    /\bsde\s*(ii|iii|2|3)\b/.test(
      normalizedTitle
    ) ||
    /\bmts\b/.test(
      normalizedTitle
    )
  ) {
    return "MID_LEVEL";
  }

  

  return "GENERAL";
};

export default getEligibilityLevel;