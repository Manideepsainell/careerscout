import express from "express";

import {
  getJobs,getNewJobs,getFresherJobs,markApplied,markExpired,getJobById,
  createJob,deleteJob,updateJob
} from "../controllers/jobController.js";
import {
  refresh10kJobs
} from "../controllers/tenKController.js";

const router = express.Router();

router.get("/", getJobs);
router.get(
  "/fresher",
  getFresherJobs
);
router.patch(
  "/:id/apply",
  markApplied
);
router.patch(
  "/:id/expire",
  markExpired
);
router.get(
  "/new",
  getNewJobs
);
router.post(
  "/refresh-10k",
  refresh10kJobs
);
router.get("/:id", getJobById);


router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;