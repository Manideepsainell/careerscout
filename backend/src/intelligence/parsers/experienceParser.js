const normalizeStructuredExperience = (experience) => {
  if (!experience) {
    return "";
  }

  return experience
    .trim()
    .toLowerCase()

    // Normalize separators
    .replace(/[–—]/g, "-")

    // Remove common words
    .replace(/\byears?\b/g, "")
    .replace(/\byrs?\b/g, "")
    .replace(/\bexperience\b/g, "")

    // Normalize "to"
    .replace(/\bto\b/g, "-")

    // Normalize spacing
    .replace(/\s*-\s*/g, "-")
    .replace(/\s*\+\s*/g, "+")

    // Collapse spaces
    .replace(/\s+/g, " ")

    .trim();
};

const parseStructuredExperience = (experience) => {
  if (!experience || experience === "Not Specified") {
    return null;
  }

  const value =
    normalizeStructuredExperience(
      experience
    );

  // 0-2
  let match =
    value.match(/^(\d+)-(\d+)$/);

  if (match) {
    return {
      min: Number(match[1]),
      max: Number(match[2]),
    };
  }

  // 3+
  match =
    value.match(/^(\d+)\+$/);

  if (match) {
    return {
      min: Number(match[1]),
      max: null,
    };
  }

  // Freshers
  if (
    /^freshers?$/.test(value)
  ) {
    return {
      min: 0,
      max: 0,
    };
  }

  // Single number
  match =
    value.match(/^(\d+)$/);

  if (match) {
    return {
      min: Number(match[1]),
      max: Number(match[1]),
    };
  }

  return null;
};

export {
  normalizeStructuredExperience,
  parseStructuredExperience,
};