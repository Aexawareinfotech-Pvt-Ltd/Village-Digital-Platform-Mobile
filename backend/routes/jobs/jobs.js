import express from "express";
import { getAllJobs, getJobById, applyForJob, getMyApplications, toggleSaveJob, getJobCategories } from "../../controllers/jobs/jobsController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { uploadJob } from "../../middlewares/upload.js";
const router = express.Router();
// Public
router.get("/",           getAllJobs);
router.get("/categories", getJobCategories);
router.get("/:id",        getJobById);
// Auth
router.use(authMiddleware);
router.post("/:id/apply",    uploadJob.single("resume"), applyForJob);
router.get("/my/applications", getMyApplications);
router.post("/:id/save",     toggleSaveJob);
export default router;
