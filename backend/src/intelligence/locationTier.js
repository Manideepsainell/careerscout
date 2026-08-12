const getLocationTier = (
  location = ""
) => {
  const text = location
    .toLowerCase()
    .trim();

  // OUTSIDE INDIA
  // Checked first so foreign remote/hybrid roles are never
  // mistaken for Indian remote roles.
  const outsideIndia = [
  // North America
  "united states",
  "usa",
  "u.s.",
  "america",
  "canada",
  "mexico",

  // United Kingdom & Ireland
  "uk",
  "united kingdom",
  "england",
  "scotland",
  "wales",
  "northern ireland",
  "ireland",

  // Europe
  "germany",
  "france",
  "spain",
  "italy",
  "netherlands",
  "belgium",
  "switzerland",
  "austria",
  "poland",
  "czech republic",
  "czechia",
  "hungary",
  "romania",
  "bulgaria",
  "portugal",
  "denmark",
  "sweden",
  "norway",
  "finland",
  "iceland",
  "greece",
  "croatia",
  "serbia",
  "slovakia",
  "slovenia",
  "estonia",
  "latvia",
  "lithuania",
  "luxembourg",
  "malta",
  "cyprus",
  "ukraine",
  "belarus",
  "bosnia",
  "montenegro",
  "north macedonia",
  "albania",
  "moldova",

  // Middle East
  "uae",
  "united arab emirates",
  "dubai",
  "abu dhabi",
  "qatar",
  "saudi arabia",
  "saudi",
  "oman",
  "bahrain",
  "kuwait",
  "israel",
  "jordan",
  "lebanon",
  "turkey",
  "türkiye",

  // East & Southeast Asia
  "singapore",
  "japan",
  "china",
  "hong kong",
  "taiwan",
  "south korea",
  "korea",
  "philippines",
  "malaysia",
  "indonesia",
  "thailand",
  "vietnam",
  "myanmar",
  "cambodia",
  "laos",
  "brunei",

  // South Asia — non-India
  "sri lanka",
  "bangladesh",
  "pakistan",
  "nepal",
  "bhutan",
  "maldives",
  "afghanistan",

  // Africa
  "south africa",
  "egypt",
  "nigeria",
  "kenya",
  "ghana",
  "morocco",
  "tunisia",
  "algeria",
  "ethiopia",
  "tanzania",
  "uganda",
  "rwanda",
  "mauritius",

  // Oceania
  "australia",
  "new zealand",
  "fiji",

  // South America
  "brazil",
  "argentina",
  "chile",
  "colombia",
  "peru",
  "uruguay",
  "ecuador",
  "bolivia",
  "paraguay",

  // Cities / regions commonly appearing without country
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
  "galway",
  "colombo",
  "manila",
  "washington",
  "boston",
  "chicago",
  "atlanta",
  "dallas",
  "phoenix",
  "san francisco",
  "los angeles",
];
  if (
    outsideIndia.some((place) =>
      text.includes(place)
    )
  ) {
    return "OUTSIDE_INDIA";
  }

  // TIER 1 — Remote India
  if (
    text.includes("remote") ||
    text.includes("work from home") ||
    text.includes("wfh") ||
    text.includes("anywhere in india") ||
    text.includes("remote india") ||
    text.includes("india remote") ||
    text.includes("remote - india") ||
    text.includes("work from anywhere in india")
  ) {
    return "TIER_1";
  }

  // TIER 2 — Hyderabad
  if (
    text.includes("hyderabad")
  ) {
    return "TIER_2";
  }

  // TIER 3 — Preferred cities
  if (
    text.includes("bangalore") ||
    text.includes("bengaluru") ||
    text.includes("chennai") ||
    text.includes("pune") ||
    text.includes("noida") ||
    text.includes("gurgaon") ||
    text.includes("gurugram") ||
    text.includes("greater noida")
  ) {
    return "TIER_3";
  }

  // TIER 4 — Other acceptable Indian cities
  if (
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
    text.includes("mangaluru") ||
    text.includes("hubli") ||
    text.includes("dharwad") ||
    text.includes("rajkot") ||
    text.includes("raipur") ||
    text.includes("nashik") ||
    text.includes("aurangabad") ||
    text.includes("warangal") ||
    text.includes("tirupati") ||
    text.includes("guntur")
  ) {
    return "TIER_4";
  }

  // TIER 5 — India, but not a specifically classified city
  if (
    text.includes("india")
  ) {
    return "TIER_5";
  }

  // Unknown / insufficient location information
  return "UNKNOWN";
};

export default getLocationTier;