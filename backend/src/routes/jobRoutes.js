import express from "express";

import {
  getJobs,getNewJobs,getFresherJobs,getJobById,
  createJob,deleteJob,updateJob
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getJobs);
router.get(
  "/fresher",
  getFresherJobs
);
router.get(
  "/new",
  getNewJobs
);
router.get("/:id", getJobById);

router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;