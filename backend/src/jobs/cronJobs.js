import cron from "node-cron";
import runDiscovery from "../services/discoveryRunner.js";

let isRunning = false;

const startCronJobs = () => {
  // TEMPORARILY DISABLED
  return;

  cron.schedule(
    "0 */6 * * *",
    async () => {
      if (isRunning) {
        console.log("Previous crawl still running");
        return;
      }

      try {
        isRunning = true;

        console.log("Running scheduled crawl...");

        await runDiscovery();

        console.log("Scheduled crawl completed");
      } catch (error) {
        console.log(error.message);
      } finally {
        isRunning = false;
      }
    }
  );
};

export default startCronJobs;