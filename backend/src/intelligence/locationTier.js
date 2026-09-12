const TIER_RANK = {
  TIER_1: 1,
  TIER_2: 2,
  TIER_3: 3,
  TIER_4: 4,
  TIER_5: 5,
  OUTSIDE_INDIA: 99,
  UNKNOWN: 100,
};

const US_STATE_CODES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT",
  "DE", "FL", "GA", "HI", "ID", "IL", "IN",
  "IA", "KS", "KY", "LA", "ME", "MD", "MA",
  "MI", "MN", "MS", "MO", "MT", "NE", "NV",
  "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
  "OK", "OR", "PA", "RI", "SC", "SD", "TN",
  "TX", "UT", "VT", "VA", "WA", "WV", "WI",
  "WY",
];

const getBestTier = (tiers) => {
  const validTiers = tiers.filter(
    (tier) => tier && tier !== "UNKNOWN"
  );

  if (validTiers.length === 0) {
    return "UNKNOWN";
  }

  return validTiers.sort(
    (a, b) => TIER_RANK[a] - TIER_RANK[b]
  )[0];
};

const getLocationTierForSingleLocation = (
  location = ""
) => {
  const text = location
    .toLowerCase()
    .trim();

  if (!text) {
    return "UNKNOWN";
  }

  // =========================================================
  // OUTSIDE INDIA — US STATE CODE
  //
  // Handles locations such as:
  // "SPRING, TX"
  // "DALLAS, TX"
  // "SAN JOSE, CA"
  //
  // Explicitly avoids treating Indian "IN" as US.
  // =========================================================

  const usStateCodeMatch = text.match(
    /(?:,|\s)\s*([a-z]{2})$/
  );

  if (
    usStateCodeMatch &&
    usStateCodeMatch[1] !== "in" &&
    US_STATE_CODES.includes(
      usStateCodeMatch[1].toUpperCase()
    )
  ) {
    return "OUTSIDE_INDIA";
  }

  // =========================================================
  // OUTSIDE INDIA
  // =========================================================

  const outsideIndia = [
    // -------------------------------------------------------
    // North America
    // -------------------------------------------------------
    "united states",
    "usa",
    "u.s.",
    "america",
    "canada",
    "mexico",

    // US states written fully
    "texas",
    "california",
    "florida",
    "arizona",
    "massachusetts",
    "connecticut",
    "delaware",
    "pennsylvania",
    "virginia",
    "minnesota",
    "new york",
    "washington",
    "colorado",
    "illinois",
    "georgia",
    "maryland",
    "north carolina",
    "south carolina",
    "new jersey",
    "ohio",
    "oregon",
    "utah",
    "mississippi",
    "wisconsin",
    "michigan",

    // Major US cities
    "san jose",
    "greenwich",
    "san diego",
    "boca raton",
    "malvern",
    "palo alto",
    "scottsdale",
    "ashburn",
    "wilmington",
    "quincy",
    "fort worth",
    "mesa",
    "stamford",
    "houston",
    "boston",
    "chicago",
    "atlanta",
    "dallas",
    "phoenix",
    "san francisco",
    "los angeles",
    "seattle",
    "austin",
    "tampa",
    "irving",
    "santa clara",
    "bentonville",
    "jersey city",
    "dayton",
    "philadelphia",
    "st. louis",
    "chandler",
    "foster city",
    "miami",
    "san ramon",
    "denver",
    "raleigh",
    "pensacola",
    "sacramento",
    "mt juliet",

    // Canada
    "toronto",
    "vancouver",
    "montreal",
    "winnipeg",
    "slave lake",
    "thunder bay",
    "oakville",
    "mississauga",
    "kanata",

    // -------------------------------------------------------
    // UK / Ireland
    // -------------------------------------------------------
    "uk",
    "united kingdom",
    "england",
    "scotland",
    "wales",
    "northern ireland",
    "ireland",

    "london",
    "dublin",
    "galway",
    "derby",
    "bristol",
    "farnborough",
    "glasgow",
    "canary wharf",
    "leavesden",

    // -------------------------------------------------------
    // Europe
    // -------------------------------------------------------
    "germany",
    "deutschland",
    "france",
    "spain",
    "italy",
    "italia",
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

    // European cities / regions
    "berlin",
    "munich",
    "paris",
    "amsterdam",
    "sofia",
    "warsaw",
    "warszawa",
    "bucharest",
    "barcelona",
    "lisbon",
    "milan",
    "eindhoven",
    "hamburg",
    "manching",
    "wroclaw",
    "krakow",
    "prague",
    "basel",
    "getafe",
    "toulouse",
    "nijmegen",
    "terneuzen",
    "rheingau-taunus-kreis",
    "vilnius",
    "belgrade",
    "gratkorn",

    // -------------------------------------------------------
    // Middle East
    // -------------------------------------------------------
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

    // -------------------------------------------------------
    // East / Southeast Asia
    // -------------------------------------------------------
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

    "singapore city",
    "tokyo",
    "manila",
    "cebu",
    "cebu city",
    "bangkok",
    "kuala lumpur",
    "shanghai",
    "taipei",
    "seoul",
    "penang",
    "dalian",
    "tianjin",
    "wuxi",
    "shenzhen",
    "quezon city",
    "ho chi minh city",
    "ho chi minh",
    "one island east",
    "mitikah",

    // -------------------------------------------------------
    // South Asia — non-India
    // -------------------------------------------------------
    "sri lanka",
    "bangladesh",
    "pakistan",
    "nepal",
    "bhutan",
    "maldives",
    "afghanistan",
    "colombo",

    // -------------------------------------------------------
    // Africa
    // -------------------------------------------------------
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
    "johannesburg",

    // -------------------------------------------------------
    // Oceania
    // -------------------------------------------------------
    "australia",
    "new zealand",
    "fiji",
    "sydney",
    "melbourne",

    // -------------------------------------------------------
    // South America
    // -------------------------------------------------------
    "brazil",
    "argentina",
    "chile",
    "colombia",
    "peru",
    "uruguay",
    "ecuador",
    "bolivia",
    "paraguay",

    "são paulo",
    "sao paulo",
    "buenos aires",
    "bogota",
    "lima",
    "monterrey",

    // -------------------------------------------------------
    // Country-code / ATS fragments
    // -------------------------------------------------------
    "gbr -",
    "gbr ",
    "phl -",
    "phl ",
    "pol -",
    "pol ",
    "vnm -",
    "vnm ",
    "it-",
    "it ",
    "de-",
    "de ",
    "cn-",
    "cn ",
    "my-",
    "my ",
    "ca-on-",
    "ca-",
    "us fl",
    "us-ca",
    "us ga",
    "us ut",
    "us -",
    "us ",
  ];

  if (
    outsideIndia.some((place) =>
      text.includes(place)
    )
  ) {
    return "OUTSIDE_INDIA";
  }

  // =========================================================
  // STRUCTURED COUNTRY-CODE FORMATS
  // =========================================================

  const foreignCodePatterns = [
    /^us\b/,
    /^us\s*-/,
    /^remote[-\s]*us\b/,
    /\bus[-\s]+remote\b/,
    /^can\b/,
    /^can[-\s]/,
    /^ca[-\s]/,
    /^gbr\b/,
    /^gbr[-\s]/,
    /^phl\b/,
    /^phl[-\s]/,
    /^ph[-\s]/,
    /^pol\b/,
    /^pol[-\s]/,
    /^de[-\s]/,
    /^it[-\s]/,
    /^cn[-\s]/,
    /^my[-\s]/,
    /^vnm[-\s]/,
  ];

  if (
    foreignCodePatterns.some(
      (pattern) => pattern.test(text)
    )
  ) {
    return "OUTSIDE_INDIA";
  }

  // =========================================================
  // TIER 1 — REMOTE INDIA
  // =========================================================

  if (
    text.includes("remote india") ||
    text.includes("india remote") ||
    text.includes("remote - india") ||
    text.includes("remote, india") ||
    text.includes("india - remote") ||
    text.includes("work from anywhere in india") ||
    text.includes("anywhere in india")
  ) {
    return "TIER_1";
  }

  // =========================================================
  // TIER 1 — HYDERABAD
  // =========================================================

  if (
    text.includes("hyderabad")
  ) {
    return "TIER_1";
  }

  // =========================================================
  // TIER 2 — TELANGANA / ANDHRA PRADESH + BANGALORE
  // =========================================================

  if (
    text.includes("bangalore") ||
    text.includes("bengaluru") ||

    // Telangana
    text.includes("warangal") ||
    text.includes("secunderabad") ||
    text.includes("karimnagar") ||
    text.includes("nizamabad") ||

    // Andhra Pradesh
    text.includes("visakhapatnam") ||
    text.includes("vizag") ||
    text.includes("vijayawada") ||
    text.includes("guntur") ||
    text.includes("tirupati") ||
    text.includes("nellore") ||
    text.includes("kurnool") ||
    text.includes("rajahmundry") ||
    text.includes("amaravati")
  ) {
    return "TIER_2";
  }

  // =========================================================
  // TIER 3 — STRONG RELOCATION OPTIONS
  // =========================================================

  if (
    text.includes("chennai") ||
    text.includes("noida") ||
    text.includes("greater noida") ||
    text.includes("gurgaon") ||
    text.includes("gurugram")
  ) {
    return "TIER_3";
  }

  // =========================================================
  // TIER 4 — OTHER ACCEPTABLE INDIAN CITIES
  // =========================================================

  if (
    text.includes("pune") ||
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
    text.includes("aurangabad")
  ) {
    return "TIER_4";
  }

  // =========================================================
  // TIER 5 — INDIA WITHOUT SPECIFIC CITY
  // =========================================================

  if (
    text.includes("india")
  ) {
    return "TIER_5";
  }

  return "UNKNOWN";
};

const getCompanyMetadataFallback = (
  companyLocationMetadata
) => {
  if (!companyLocationMetadata) {
    return "UNKNOWN";
  }

  // Explicit remote India research
  if (
    companyLocationMetadata.remoteIndia === true
  ) {
    return "TIER_1";
  }

  // Verified Hyderabad presence
  if (
    companyLocationMetadata.hyderabad ===
      "MAIN_BRANCH" ||
    companyLocationMetadata.hyderabad ===
      "BRANCH"
  ) {
    return "TIER_1";
  }

  // Verified India locations as fallback
  const cities =
    companyLocationMetadata.indiaLocations || [];

  if (
    !Array.isArray(cities) ||
    cities.length === 0
  ) {
    return "UNKNOWN";
  }

  const tiers = cities.map((city) =>
    getLocationTierForSingleLocation(city)
  );

  return getBestTier(tiers);
};

const isAmbiguousLocation = (
  location = ""
) => {
  const text = location
    .toLowerCase()
    .trim();

  if (!text) {
    return true;
  }

  const ambiguousLocations = [
    "not specified",
    "hybrid",
    "remote",
    "distributed",
    "in-office",
    "work at home",
    "home based",
    "virtual",
    "worldwide",
    "home based - worldwide",
    "home based - emea",
    "home based - apac",
  ];

  if (
    ambiguousLocations.some(
      (value) =>
        text === value ||
        text.startsWith(`${value} -`) ||
        text.startsWith(`${value},`)
    )
  ) {
    return true;
  }

  // Workday generic multi-location labels
  if (
    /^\d+\s+locations?$/i.test(text)
  ) {
    return true;
  }

  return false;
};

const getLocationTier = (
  location = "",
  primaryLocation = "",
  secondaryLocations = [],
  companyLocationMetadata = null
) => {
  // =========================================================
  // 1. STRUCTURED JOB LOCATIONS
  // =========================================================

  const structuredLocations = [];

  if (
    typeof primaryLocation === "string" &&
    primaryLocation.trim()
  ) {
    structuredLocations.push(
      primaryLocation.trim()
    );
  }

  if (
    Array.isArray(secondaryLocations)
  ) {
    for (const secondary of secondaryLocations) {
      if (
        typeof secondary === "string" &&
        secondary.trim()
      ) {
        structuredLocations.push(
          secondary.trim()
        );
      }
    }
  }

  if (
    structuredLocations.length > 0
  ) {
    const tiers = structuredLocations.map(
      (jobLocation) =>
        getLocationTierForSingleLocation(
          jobLocation
        )
    );

    const bestTier = getBestTier(tiers);

    if (bestTier !== "UNKNOWN") {
      return bestTier;
    }
  }

  // =========================================================
  // 2. NORMALIZED JOB LOCATION
  // =========================================================

  const directTier =
    getLocationTierForSingleLocation(
      location
    );

  if (directTier !== "UNKNOWN") {
    return directTier;
  }

  // =========================================================
  // 3. COMPANY METADATA FALLBACK
  //
  // ONLY for genuinely ambiguous locations.
  // =========================================================

  if (
    isAmbiguousLocation(location)
  ) {
    return getCompanyMetadataFallback(
      companyLocationMetadata
    );
  }

  // Explicit but unrecognized location
  return "UNKNOWN";
};

export default getLocationTier;