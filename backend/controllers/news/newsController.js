import News from "../../models/News/News.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const getAllNews = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const filter = { status: "published" };
    if (category && category !== "All") filter.category = category;
    if (search) filter.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];
    const skip = (Number(page) - 1) * Number(limit);
    const [news, total] = await Promise.all([
      News.find(filter).sort({ featured: -1, publishDate: -1 }).skip(skip).limit(Number(limit)),
      News.countDocuments(filter),
    ]);
    return res.json({ success: true, data: news, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) } });
  } catch (err) { return sendError(res, err.message); }
};

export const getNewsById = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
    if (!news) return sendError(res, "News not found", 404);
    return sendSuccess(res, "News fetched", news);
  } catch (err) { return sendError(res, err.message); }
};

export const getFeaturedNews = async (req, res) => {
  try {
    const news = await News.find({ status: "published", featured: true }).sort({ publishDate: -1 }).limit(5);
    return sendSuccess(res, "Featured news fetched", news);
  } catch (err) { return sendError(res, err.message); }
};

export const getNewsCategories = async (req, res) => {
  const categories = ["All","Administrative","Event","Emergency","Health","Education","Infrastructure","Agriculture"];
  return sendSuccess(res, "Categories fetched", categories);
};

export const likeNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return sendError(res, "News not found", 404);
    const liked = news.likes.map(String).includes(req.user.id);
    if (liked) news.likes.pull(req.user.id);
    else news.likes.push(req.user.id);
    await news.save();
    return sendSuccess(res, liked ? "Unliked" : "Liked", { likesCount: news.likes.length, liked: !liked });
  } catch (err) { return sendError(res, err.message); }
};
