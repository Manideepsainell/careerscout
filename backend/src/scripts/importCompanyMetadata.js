
import dotenv from "dotenv";

dotenv.config();
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import connectDB from "../config/db.js";
import Company from "../models/Company.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importCompanyMetadata() {
  await connectDB();

  const filePath = path.join(
    __dirname,
    "../../data/companyMetadata.json"
  );

  const metadata = JSON.parse(await fs.readFile(filePath, "utf8"));

  console.log(`Loaded ${metadata.length} metadata records...\n`);

  // Load all company names once
  const companies = await Company.find({}, { name: 1 }).lean();

  const companySet = new Set(companies.map(c => c.name));

  const bulkOps = [];
  const notFound = [];

  for (const item of metadata) {
if (!companySet.has(item.company)) {
  notFound.push(item.company);
  continue;
}

filter: {
  name: item.company
}
    bulkOps.push({
      updateOne: {
       filter: {
  name: { $regex: `^${item.company}$`, $options: "i" }
},
        update: {
          $set: {
            companyType: item.companyType,
            priority: item.priority,
            fresherFriendly: item.fresherFriendly,
            backendStrength: item.backendStrength,
            hiringPattern: item.hiringPattern,
            companyTier: item.companyTier,
            companyBoost: item.companyBoost
          }
        }
      }
    });
  }

  const result = await Company.bulkWrite(bulkOps, {
    ordered: false
  });

  console.log("\n========== IMPORT COMPLETE ==========");
  console.log(`Metadata Records : ${metadata.length}`);
  console.log(`Matched          : ${result.matchedCount}`);
  console.log(`Modified         : ${result.modifiedCount}`);
  console.log(`Not Found        : ${notFound.length}`);

  if (notFound.length) {
    console.log("\nMissing Companies:");
    console.table(notFound);
  }

  process.exit(0);
}

importCompanyMetadata().catch(err => {
  console.error(err);
  process.exit(1);
});