const getFreshness = (
  postedDate
) => {
  if (!postedDate) {
    return "UNKNOWN";
  }

  const today = new Date();

  const posted = new Date(
    postedDate
  );

  const diffDays = Math.floor(
    (today - posted) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 0) {
    return "TODAY";
  }

  if (diffDays <= 2) {
    return "VERY_FRESH";
  }

  if (diffDays <= 7) {
    return "FRESH";
  }

  if (diffDays <= 14) {
    return "RECENT";
  }

  if (diffDays <= 30) {
    return "ACTIVE";
  }

  if (diffDays <= 60) {
    return "OLD";
  }

  return "STALE";
};

export default getFreshness;