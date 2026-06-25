const getFreshnessScore = (job) => {

  const referenceDate =
    job.postedDate || job.createdAt;

  const daysOld =
    (Date.now() -
      new Date(referenceDate)) /
    (1000 * 60 * 60 * 24);

  if (daysOld <= 1) {
    return 50;
  }

  if (daysOld <= 3) {
    return 40;
  }

  if (daysOld <= 7) {
    return 30;
  }

  if (daysOld <= 15) {
    return 15;
  }

  if (daysOld <= 30) {
    return 0;
  }

  if (daysOld > 180) {
    return -200;
  }

  if (daysOld > 120) {
    return -150;
  }

  if (daysOld > 90) {
    return -100;
  }

  if (daysOld > 60) {
    return -60;
  }

  return -30;
};

export default getFreshnessScore;