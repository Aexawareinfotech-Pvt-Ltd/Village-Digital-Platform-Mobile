import express from "express";
import { submitGrievance, getMyGrievances, getGrievanceById, trackByGrievanceId, getGrievanceCategories } from "../../controllers/grievance/grievanceController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { uploadGrievance } from "../../middlewares/upload.js";
const router = express.Router();
router.get("/categories", getGrievanceCategories);
// All grievance routes require auth
router.use(authMiddleware);
router.post("/",                            uploadGrievance.array("attachments", 3), submitGrievance);
router.get("/my",                           getMyGrievances);
router.get("/track/:grievanceId",           trackByGrievanceId);
router.get("/:id",                          getGrievanceById);
export default router;
