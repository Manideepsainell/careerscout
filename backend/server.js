import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import startCronJobs
from "./src/jobs/cronJobs.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  startCronJobs();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();