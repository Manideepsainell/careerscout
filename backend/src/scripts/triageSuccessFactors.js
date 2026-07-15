// backend/src/scripts/triageSuccessFactors.js
import "dotenv/config";
import axios from "axios";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}

async function main() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(); // uses the db name from the URI; pass db.db("name") if needed

  const companies = await db
    .collection("companies")
    .find({ jobBoardType: "SUCCESSFACTORS", skipReason: { $exists: false } })
    .toArray();

  console.log(`Triaging ${companies.length} companies...\n`);

  for (const c of companies) {
    try {
      const res = await axios.get(c.openPositionsUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        },
        timeout: 10000,
        validateStatus: () => true, // don't throw on 4xx/5xx — we want to see the status
      });

      const html = res.data;
      const status = res.status;

      let verdict;
      if (typeof html !== "string") {
        verdict = "NON-HTML RESPONSE (inspect manually)";
      } else if (/verp-client|ng-app|id="root"/i.test(html)) {
        verdict = "SPA SHELL (needs XHR capture)";
      } else if (/jobTitle|job-title|requisition/i.test(html)) {
        verdict = "SERVER-RENDERED (scrapeable)";
      } else {
        verdict = "UNKNOWN (inspect manually)";
      }

      console.log(`${c.name.padEnd(25)} [${status}] ${verdict}`);
    } catch (err) {
      console.log(`${c.name.padEnd(25)} ERROR: ${err.message}`);
    }
  }

  await client.close();
}

main().catch(console.error);