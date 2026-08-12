import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/Job.js";

dotenv.config();

const parseWorkdayEndDate = (endDate) => {
  if (
    !endDate ||
    !/^\d{4}-\d{2}-\d{2}$/.test(endDate)
  ) {
    return null;
  }

  const [year, month, day] =
    endDate.split("-").map(Number);

  return new Date(
    year,
    month - 1,
    day
  );
};

const getApplicationUrgency = (
  timeLeftToApply
) => {
  if (
    !timeLeftToApply ||
    typeof timeLeftToApply !== "string"
  ) {
    return "UNKNOWN";
  }

  const text =
    timeLeftToApply.toLowerCase();

  if (text.includes("hour")) {
    return "URGENT";
  }

  const dayMatch =
    text.match(/(\d+)\s+day/);

  if (!dayMatch) {
    if (text.includes("30+ days")) {
      return "OPEN";
    }

    return "UNKNOWN";
  }

  const days = Number(dayMatch[1]);

  if (days <= 3) {
    return "SOON";
  }

  return "OPEN";
};

const run = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB Connected"
    );

    const jobs = await Job.find(
      { source: "WORKDAY" },
      {
        _id: 1,
        endDate: 1,
        timeLeftToApply: 1,
      }
    );

    console.log(
      `Found ${jobs.length} Workday jobs`
    );

    let updated = 0;

    for (const job of jobs) {
      const applicationDeadline =
        parseWorkdayEndDate(
          job.endDate
        );

      const applicationUrgency =
        getApplicationUrgency(
          job.timeLeftToApply
        );

      await Job.updateOne(
        { _id: job._id },
        {
          $set: {
            applicationDeadline,
            applicationUrgency,
          },
        }
      );

      updated++;
    }

    console.log(
      `Updated: ${updated}`
    );

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

run();