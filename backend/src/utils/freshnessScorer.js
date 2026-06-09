const getFreshnessScore = (job) => {
  const referenceDate =
    job.postedDate || job.createdAt;

  const daysOld =
    (Date.now() -
      new Date(referenceDate)) /
    (1000 * 60 * 60 * 24);

  if (daysOld <= 3) {
    return 30;
  }

  if (daysOld <= 7) {
    return 20;
  }

  if (daysOld <= 14) {
    return 10;
  }

  if (daysOld <= 30) {
    return 5;
  }

  return -10;
};

export default getFreshnessScore;