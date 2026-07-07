import 'dotenv/config';
import mongoose from 'mongoose';

import Job from '../models/Job.js';
import getExperienceBand from '../intelligence/getExperienceBand.js';

try {
  await mongoose.connect(process.env.MONGO_URI);

  console.log('Connected to MongoDB');

  const jobs = await Job.find({});

  let updated = 0;

  for (const job of jobs) {
    const newBand = getExperienceBand(job.title);

    if (job.experienceBand !== newBand) {
      job.experienceBand = newBand;

      await job.save();

      updated++;
    }
  }

  console.log(`Updated ${updated} jobs`);

  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}