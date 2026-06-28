const getLocationTier = (
  location = ""
) => {
  const text =
    location.toLowerCase();

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

  // Outside India
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