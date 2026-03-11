import express from "express";
import { getAllServices, getServicesByCategory, getServiceById } from "../../controllers/services/servicesController.js";
const router = express.Router();
router.get("/",                     getAllServices);
router.get("/category/:category",   getServicesByCategory);
router.get("/:id",                  getServiceById);
export default router;
