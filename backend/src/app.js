import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import statsRoutes
from "./routes/statsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api/companies", companyRoutes);
app.use(
  "/api/stats",
  statsRoutes
);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerScout API is running",
  });
});

app.use(errorHandler);

export default app;