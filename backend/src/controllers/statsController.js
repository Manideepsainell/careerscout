import Job from "../models/Job.js";
import RunStat from "../models/RunStat.js";

export const getStats = async (
  req,
  res
) => {

  try {

    const yesterday =
      new Date();

    yesterday.setDate(
      yesterday.getDate() - 1
    );

    const totalJobs =
      await Job.countDocuments();

    const activeJobs =
      await Job.countDocuments({
        status: "ACTIVE",
      });

    const expiredJobs =
      await Job.countDocuments({
        status: "EXPIRED",
      });

    const newJobsToday =
      await Job.countDocuments({
        lastSeenAt: {
          $gte: yesterday,
        },
      });

    const lastRun =
      await RunStat.findOne()
        .sort({
          completedAt: -1,
        });

    res.json({
      totalJobs,

      activeJobs,

      expiredJobs,

      newJobsToday,

      lastUpdated:
        lastRun?.completedAt,

      companiesProcessed:
        lastRun?.companiesProcessed || 0,

      companiesFailed:
        lastRun?.companiesFailed || 0,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};