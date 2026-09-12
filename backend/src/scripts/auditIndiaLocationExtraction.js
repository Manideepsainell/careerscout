import fs from "fs";
import path from "path";

const RESEARCH_PATH = path.resolve(
  process.cwd(),
  "src/data/companyLocationResearch.json"
);

const INDIAN_CITIES = [
  "Hyderabad",
  "Bangalore",
  "Bengaluru",
  "Pune",
  "Mumbai",
  "Navi Mumbai",
  "Chennai",
  "Gurgaon",
  "Gurugram",
  "Noida",
  "Greater Noida",
  "Delhi",
  "New Delhi",
  "Kolkata",
  "Ahmedabad",
  "Vadodara",
  "Baroda",
  "Surat",
  "Jaipur",
  "Indore",
  "Nagpur",
  "Kochi",
  "Ernakulam",
  "Coimbatore",
  "Mysore",
  "Mysuru",
  "Chandigarh",
  "Mohali",
  "Bhubaneswar",
  "Bhubaneshwar",
  "Lucknow",
  "Visakhapatnam",
  "Vizag",
  "Vijayawada",
  "Guntur",
  "Tirupati",
  "Trichy",
  "Tiruchirappalli",
  "Madurai",
  "Mangalore",
  "Mangaluru",
  "Rajkot",
  "Nashik",
  "Aurangabad",
  "Warangal",
  "Thane",
  "Gandhinagar",
];

const normalizeCity = (city) => {
  const normalized = city
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\.$/, "");

  const aliases = {
    Bengaluru: "Bangalore",
    Gurugram: "Gurgaon",
    "New Delhi": "Delhi",
    Mysuru: "Mysore",
    Mangaluru: "Mangalore",
    Bhubaneshwar: "Bhubaneswar",
    Trichy: "Tiruchirappalli",
    Vizag: "Visakhapatnam",
    Baroda: "Vadodara",
  };

  return aliases[normalized] || normalized;
};

const getHyderabadStatus = (location = "") => {
  const text = location.trim();

  if (
    text.startsWith(
      "Hyderabad: Has a network/data-center PoP"
    )
  ) {
    return "NOT_FOUND";
  }

  const match = text.match(
    /^Hyderabad:\s*([^(]+)/i
  );

  if (!match) {
    return "UNKNOWN";
  }

  const statusText = match[1]
    .trim()
    .toUpperCase();

  if (statusText.startsWith("MAIN BRANCH")) {
    return "MAIN_BRANCH";
  }

  if (statusText.startsWith("BRANCH")) {
    return "BRANCH";
  }

  if (statusText.startsWith("NOT FOUND")) {
    return "NOT_FOUND";
  }

  if (statusText.startsWith("UNCLEAR")) {
    return "UNCLEAR";
  }

  if (
    statusText.startsWith("REMOTE HIRING ONLY")
  ) {
    return "REMOTE_ONLY";
  }

  return "UNKNOWN";
};

const extractCities = (text = "") => {
  const found = new Set();

  for (const city of INDIAN_CITIES) {
    const pattern = new RegExp(
      `\\b${city.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      )}\\b`,
      "i"
    );

    if (pattern.test(text)) {
      found.add(normalizeCity(city));
    }
  }

  return [...found];
};

const detectRemoteIndia = (text = "") => {
  const lower = text.toLowerCase();

  const explicitRemotePatterns = [
    "remote hiring",
    "remote-first",
    "fully remote",
    "all-remote",
    "remote employees",
    "hired remotely",
    "employees hired remotely",
    "work remotely",
    "remote workers",
    "distributed employees",
    "no physical office",
  ];

  return explicitRemotePatterns.some((pattern) =>
    lower.includes(pattern)
  );
};

const run = () => {
  const research = JSON.parse(
    fs.readFileSync(RESEARCH_PATH, "utf8")
  );

  let processed = 0;
  let withCities = 0;
  let withoutCities = 0;
  let remoteIndia = 0;

  const results = [];

  for (const record of research) {
    processed++;

    const location = record.location || "";

    const hyderabadStatus =
      getHyderabadStatus(location);

    let cities = extractCities(location);

    // Hyderabad is handled separately.
    // Do not treat the "Hyderabad:" prefix itself
    // as proof of a Hyderabad office.
    cities = cities.filter(
      (city) => city !== "Hyderabad"
    );

    // Add Hyderabad only when the research explicitly
    // establishes a branch or remote hiring presence.
    if (
      [
        "MAIN_BRANCH",
        "BRANCH",
        "REMOTE_ONLY",
      ].includes(hyderabadStatus)
    ) {
      cities.unshift("Hyderabad");
    }

    const remote =
      hyderabadStatus === "REMOTE_ONLY" ||
      detectRemoteIndia(location);

    if (cities.length > 0) {
      withCities++;
    } else {
      withoutCities++;
    }

    if (remote) {
      remoteIndia++;
    }

    results.push({
      company: record.company,
      hyderabad: hyderabadStatus,
      indiaLocations: cities,
      remoteIndia: remote,
      sourceLocation: location,
    });
  }

  console.log(
    "\n========== INDIA LOCATION EXTRACTION AUDIT =========="
  );

  console.log(`Processed        : ${processed}`);
  console.log(`With cities      : ${withCities}`);
  console.log(`Without cities   : ${withoutCities}`);
  console.log(`Remote India     : ${remoteIndia}`);

  console.log(
    "\n========== SAMPLE EXTRACTIONS =========="
  );

  for (const result of results.slice(0, 20)) {
    console.log(`\n${result.company}`);

    console.log(
      `Hyderabad       : ${result.hyderabad}`
    );

    console.log(
      `India locations : ${
        result.indiaLocations.join(", ") || "NONE"
      }`
    );

    console.log(
      `Remote India    : ${result.remoteIndia}`
    );
  }
  console.log(
  "\n========== WITHOUT CITY =========="
);

for (const result of results) {
  if (result.indiaLocations.length === 0) {
    console.log(
      `\n${result.company}`
    );
    console.log(
      `Hyderabad    : ${result.hyderabad}`
    );
    console.log(
      `Remote India : ${result.remoteIndia}`
    );
    console.log(
      `Source       : ${result.sourceLocation}`
    );
  }
}
};

run();