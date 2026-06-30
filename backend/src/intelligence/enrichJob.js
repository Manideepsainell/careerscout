import enrichExperience from "./enrichers/enrichExperience.js";

const enrichJob = (job) => {
  job = enrichExperience(job);

  return job;
};

export default enrichJob;