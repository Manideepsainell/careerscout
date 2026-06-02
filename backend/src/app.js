import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerScout API is running",
  });
});

export default app;