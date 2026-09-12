import "dotenv/config";
import fs from "fs";
import path from "path";

const RESEARCH_PATH = path.resolve(
  process.cwd(),
  "src/data/companyLocationResearch.json"
);

const run = () => {
  const research = JSON.parse(
    fs.readFileSync(RESEARCH_PATH, "utf8")
  );

  const patterns = {
    OTHER_INDIA_LOCATIONS: [],
    OTHER_INDIA: [],
    INDIA_OFFICES: [],
    INDIA_OFFICE: [],
    INDIA_HQ: [],
    MAIN_INDIA: [],
    NO_OTHER_INDIA: [],
    REMOTE_WORDING: [],
    NO_EXPLICIT_INDIA_PATTERN: [],
  };

  for (const record of research) {
    const location = (record.location || "").trim();
    const lower = location.toLowerCase();

    if (
      lower.includes("no other india locations found")
    ) {
      patterns.NO_OTHER_INDIA.push(record);
      continue;
    }

    if (
      lower.includes("other india locations:")
    ) {
      patterns.OTHER_INDIA_LOCATIONS.push(record);
      continue;
    }

    if (
      lower.includes("other india:")
    ) {
      patterns.OTHER_INDIA.push(record);
      continue;
    }

    if (
      lower.includes("india offices:")
    ) {
      patterns.INDIA_OFFICES.push(record);
      continue;
    }

    if (
      lower.includes("india office:")
    ) {
      patterns.INDIA_OFFICE.push(record);
      continue;
    }

    if (
      lower.includes("india hq") ||
      lower.includes("india headquarters")
    ) {
      patterns.INDIA_HQ.push(record);
      continue;
    }

    if (
      lower.includes("main india")
    ) {
      patterns.MAIN_INDIA.push(record);
      continue;
    }

    if (
      lower.includes("remote-first") ||
      lower.includes("remote hiring") ||
      lower.includes("fully remote") ||
      lower.includes("no physical office") ||
      lower.includes("no formal office")
    ) {
      patterns.REMOTE_WORDING.push(record);
      continue;
    }

    patterns.NO_EXPLICIT_INDIA_PATTERN.push(record);
  }

  console.log(
    "\n========== INDIA LOCATION PATTERN AUDIT =========="
  );

  for (const [name, records] of Object.entries(patterns)) {
    console.log(
      `${name.padEnd(28)} ${records.length}`
    );
  }

  console.log(
    "\n========== SAMPLES =========="
  );

  for (const [name, records] of Object.entries(patterns)) {
    console.log(`\n--- ${name} ---`);

    records.slice(0, 5).forEach((record) => {
      console.log(
        `${record.company} → ${record.location}`
      );
    });
  }
};

run();