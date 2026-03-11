import express from "express";
import { getAllNews, getNewsById, getFeaturedNews, getNewsCategories, likeNews } from "../../controllers/news/newsController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();
// Public
router.get("/",           getAllNews);
router.get("/featured",   getFeaturedNews);
router.get("/categories", getNewsCategories);
router.get("/:id",        getNewsById);
// Auth
router.post("/:id/like",  authMiddleware, likeNews);
export default router;
