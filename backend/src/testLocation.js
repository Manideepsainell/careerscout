import LocationTier from "./intelligence/LocationTier.js";

const tests = [
  "Hyderabad, India",
  "Remote - India",
  "Hybrid - Bangalore, India",
  "Bangalore, India",
  "Pune, India",
  "Guntur, India",
  "Tirupati, India",
  "Remote - United States",
  "Hybrid - New York",
  "Remote",
];

for (const location of tests) {
  console.log(
    `${location} → ${LocationTier(location)}`
  );
}