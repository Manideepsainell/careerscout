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
  "america",
  "canada",
  "uk",
  "united kingdom",
  "england",
  "scotland",
  "wales",
  "ireland",
  "germany",
  "france",
  "spain",
  "italy",
  "netherlands",
  "belgium",
  "switzerland",
  "austria",
  "poland",
  "czech",
  "hungary",
  "romania",
  "bulgaria",
  "portugal",
  "denmark",
  "sweden",
  "norway",
  "finland",
  "singapore",
  "japan",
  "china",
  "hong kong",
  "taiwan",
  "south korea",
  "korea",
  "australia",
  "new zealand",
  "mexico",
  "brazil",
  "argentina",
  "uae",
  "dubai",
  "abu dhabi",
  "qatar",
  "saudi",
  "oman",

  // Cities
  "london",
  "berlin",
  "munich",
  "paris",
  "amsterdam",
  "sofia",
  "warsaw",
  "dublin",
  "zurich",
  "geneva",
  "tokyo",
  "singapore city",
  "new york",
  "jersey city",
  "seattle",
  "austin",
  "tampa",
  "irving",
  "texas",
  "california",
  "santa clara",
  "bentonville",
  "toronto",
  "vancouver",
  "winnipeg",
  "sydney",
  "melbourne",
  "budapest",
"hungary",
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
  text.includes("gurugram") ||
  text.includes("greater noida")
) {
  return "TIER_3";
}

// Acceptable cities
if (
  text.includes("bangalore") ||
  text.includes("bengaluru") ||
  text.includes("mumbai") ||
  text.includes("navi mumbai") ||
  text.includes("delhi") ||
  text.includes("new delhi") ||
  text.includes("ahmedabad") ||
  text.includes("coimbatore") ||
  text.includes("kochi") ||
  text.includes("ernakulam") ||
  text.includes("thiruvananthapuram") ||
  text.includes("trivandrum") ||
  text.includes("visakhapatnam") ||
  text.includes("vizag") ||
  text.includes("vijayawada") ||
  text.includes("mysore") ||
  text.includes("mysuru") ||
  text.includes("jaipur") ||
  text.includes("indore") ||
  text.includes("nagpur") ||
  text.includes("kolkata") ||
  text.includes("bhubaneswar") ||
  text.includes("bhubaneshwar") ||
  text.includes("lucknow") ||
  text.includes("vadodara") ||
  text.includes("baroda") ||
  text.includes("surat") ||
  text.includes("chandigarh") ||
  text.includes("mohali") ||
  text.includes("trichy") ||
  text.includes("tiruchirappalli") ||
  text.includes("madurai") ||
  text.includes("mangalore") ||
  text.includes("mangaluru")
) {
  return "TIER_4";
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