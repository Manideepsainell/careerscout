const getLocationTier = (
  location = ""
) => {
  const text =
    location.toLowerCase();

  // Outside India — checked first, so a foreign remote/hybrid role
  // (e.g. "Remote - United States", "London, UK - Hybrid") is correctly
  // excluded instead of being scored as our best tier below.
  const outsideIndia = [
    "united states",
    "usa",
    "u.s.",
    "canada",
    "uk",
    "united kingdom",
    "england",
    "germany",
    "poland",
    "ireland",
    "france",
    "australia",
    "new zealand",
    "singapore",
    "japan",
    "china",
    "mexico",
    "brazil",
    "netherlands",
    "switzerland",
    "jersey city",
    "new york",
    "texas",
    "california",
    "irving",
    "santa clara",
    "bentonville",
    "winnipeg",
    "toronto",
    "vancouver",
    "london",
    "berlin",
    "tokyo",
    "sydney",
  ];

  if (
    outsideIndia.some((place) =>
      text.includes(place)
    )
  ) {
    return "OUTSIDE_INDIA";
  }

  // Remote
  if (
    text.includes("remote") ||
    text.includes("work from home") ||
    text.includes("wfh") ||
    text.includes("anywhere in india") ||
    text.includes("hybrid")
  ) {
    return "TIER_1";
  }

  // Hyderabad (Top preference)
  if (
    text.includes("hyderabad")
  ) {
    return "TIER_2";
  }

  // Preferred cities
  if (
    text.includes("chennai") ||
    text.includes("pune") ||
    text.includes("noida") ||
    text.includes("gurgaon") ||
    text.includes("gurugram")
  ) {
    return "TIER_3";
  }

  // Acceptable cities
  if (
    text.includes("bangalore") ||
    text.includes("bengaluru") ||
    text.includes("mumbai") ||
    text.includes("delhi") ||
    text.includes("navi mumbai")
  ) {
    return "TIER_4";
  }

  // India but not preferred
  if (
    text.includes("india")
  ) {
    return "TIER_5";
  }

  // Unknown
  return "UNKNOWN";
};

export default getLocationTier;