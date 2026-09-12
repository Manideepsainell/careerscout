import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

import Company from "../models/Company.js";

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
    const escapedCity = city.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const pattern = new RegExp(
      `\\b${escapedCity}\\b`,
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

const buildLocationMetadata = (location) => {
  const hyderabadStatus =
    getHyderabadStatus(location);

  let cities = extractCities(location);

  // Hyderabad is handled independently from the
  // Hyderabad classification text.
  cities = cities.filter(
    (city) => city !== "Hyderabad"
  );

  // Only add Hyderabad when the research explicitly
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

  const remoteIndia =
    hyderabadStatus === "REMOTE_ONLY" ||
    detectRemoteIndia(location);

  return {
    indiaLocations: cities,
    remoteIndia,
  };
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const research = JSON.parse(
      fs.readFileSync(RESEARCH_PATH, "utf8")
    );

    console.log(
      `Loaded ${research.length} research records`
    );

    let matched = 0;
    let updated = 0;
    let unchanged = 0;
    let notFound = 0;

    const distribution = {
      withCities: 0,
      withoutCities: 0,
      remoteIndia: 0,
    };

    for (const record of research) {
      const companyName = record.company?.trim();

      if (!companyName) {
        continue;
      }

      const company = await Company.findOne({
        name: companyName,
      });

      if (!company) {
        notFound++;

        console.log(
          `Company not found: ${companyName}`
        );

        continue;
      }

      matched++;

      const location = record.location || "";

      const {
        indiaLocations,
        remoteIndia,
      } = buildLocationMetadata(location);

      if (indiaLocations.length > 0) {
        distribution.withCities++;
      } else {
        distribution.withoutCities++;
      }

      if (remoteIndia) {
        distribution.remoteIndia++;
      }

      const currentLocations =
        company.locationMetadata?.indiaLocations || [];

      const currentRemote =
        company.locationMetadata?.remoteIndia || false;

      const sameLocations =
        currentLocations.length ===
          indiaLocations.length &&
        currentLocations.every(
          (city, index) =>
            city === indiaLocations[index]
        );

      const sameRemote =
        currentRemote === remoteIndia;

      if (sameLocations && sameRemote) {
        unchanged++;
        continue;
      }

      await Company.updateOne(
        { _id: company._id },
        {
          $set: {
            "locationMetadata.indiaLocations":
              indiaLocations,

            "locationMetadata.remoteIndia":
              remoteIndia,

            "locationMetadata.verified":
              true,

            "locationMetadata.verifiedAt":
              new Date(),

            "locationMetadata.source":
              "LOCATION_RESEARCH",
          },
        }
      );

      updated++;
    }

    console.log(
      "\n========== INDIA LOCATION METADATA IMPORT =========="
    );

    console.log(
      `Research records : ${research.length}`
    );

    console.log(
      `Matched          : ${matched}`
    );

    console.log(
      `Updated          : ${updated}`
    );

    console.log(
      `Unchanged        : ${unchanged}`
    );

    console.log(
      `Not found        : ${notFound}`
    );

    console.log("\nDistribution:");

    console.log(
      `With cities      : ${distribution.withCities}`
    );

    console.log(
      `Without cities   : ${distribution.withoutCities}`
    );

    console.log(
      `Remote India     : ${distribution.remoteIndia}`
    );

    await mongoose.disconnect();

    console.log(
      "\nMongoDB Disconnected"
    );
  } catch (error) {
    console.error(
      "India location metadata import failed:",
      error
    );

    process.exit(1);
  }
};

run();