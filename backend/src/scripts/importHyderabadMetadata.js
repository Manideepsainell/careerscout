import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Company from "../models/Company.js";

const RESEARCH_PATH = path.resolve(
  process.cwd(),
  "src/data/companyLocationResearch.json"
);

const parseHyderabadStatus = (location = "") => {
  const text = location.trim();

  if (text.startsWith("Hyderabad: MAIN BRANCH")) {
    return "MAIN_BRANCH";
  }

  if (text.startsWith("Hyderabad: BRANCH")) {
    return "BRANCH";
  }

  if (text.startsWith("Hyderabad: NOT FOUND")) {
    return "NOT_FOUND";
  }

  if (text.startsWith("Hyderabad: UNCLEAR")) {
    return "UNCLEAR";
  }

  if (text.startsWith("Hyderabad: REMOTE HIRING ONLY")) {
    return "REMOTE_ONLY";
  }

  // Known research wording indicating infrastructure/
  // data-center presence but no confirmed corporate office.
  if (
    text.startsWith(
      "Hyderabad: Has a network/data-center PoP"
    )
  ) {
    return "NOT_FOUND";
  }

  return null;
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

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
    let unknownFormat = 0;

    const distribution = {
      MAIN_BRANCH: 0,
      BRANCH: 0,
      NOT_FOUND: 0,
      UNCLEAR: 0,
      REMOTE_ONLY: 0,
    };

    const unknownCompanies = [];

    for (const record of research) {
      const companyName = record.company?.trim();

      if (!companyName) {
        continue;
      }

      const status = parseHyderabadStatus(
        record.location
      );

      if (!status) {
        unknownFormat++;

        unknownCompanies.push({
          company: companyName,
          location: record.location,
        });

        continue;
      }

      const company = await Company.findOne({
        name: companyName,
      });

      if (!company) {
        notFound++;
        continue;
      }

      matched++;
      distribution[status]++;

      const currentStatus =
        company.locationMetadata?.hyderabad;

      const needsUpdate =
        currentStatus !== status ||
        company.locationMetadata?.verified !== true ||
        company.locationMetadata?.source !==
          "LOCATION_RESEARCH";

      if (!needsUpdate) {
        unchanged++;
        continue;
      }

      await Company.updateOne(
        { _id: company._id },
        {
          $set: {
            "locationMetadata.hyderabad": status,
            "locationMetadata.verified": true,
            "locationMetadata.verifiedAt": new Date(),
            "locationMetadata.source":
              "LOCATION_RESEARCH",
          },
        }
      );

      updated++;
    }

    console.log(
      "\n========== HYDERABAD METADATA IMPORT =========="
    );

    console.log(`Research records : ${research.length}`);
    console.log(`Matched          : ${matched}`);
    console.log(`Updated          : ${updated}`);
    console.log(`Unchanged        : ${unchanged}`);
    console.log(`Not found        : ${notFound}`);
    console.log(`Unknown format   : ${unknownFormat}`);

    console.log("\nDistribution:");

    for (const [status, count] of Object.entries(
      distribution
    )) {
      console.log(
        `${status.padEnd(15)} ${count}`
      );
    }

    if (unknownCompanies.length > 0) {
      console.log(
        "\n========== UNKNOWN FORMATS =========="
      );

      for (const item of unknownCompanies) {
        console.log(
          `${item.company} → ${item.location}`
        );
      }
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error(
      "Hyderabad metadata import failed:",
      error
    );

    process.exit(1);
  }
};

run();