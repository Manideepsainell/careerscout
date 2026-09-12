import mongoose from "mongoose";
import dotenv from "dotenv"
import Job from "../models/Job.js";
import fetchAshbyPublicMetadata from "../collectors/ashby/fetchAshbyPublicMetadata.js";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const run = async () => {
  await mongoose.connect(MONGO_URI);

  const jobs = await Job.find({
    source: "ASHBY",
  })
    .limit(5)
    .select("_id title jobUrl postedDate");

  console.log(
    `\nTesting ${jobs.length} Ashby jobs\n`
  );

  for (const job of jobs) {
    const metadata =
      await fetchAshbyPublicMetadata(job);

    console.log({
      id: job._id,
      title: job.title,
      postedDate: metadata.postedDate || null,
    });

    await sleep(1000);
  }

  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error);

  try {
    await mongoose.disconnect();
  } catch {}

  process.exit(1);
});