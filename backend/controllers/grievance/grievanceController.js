import Grievance from "../../models/Grievance/Grievance.js";
import crypto from "crypto";
import { sendSuccess, sendError } from "../../utils/response.js";

export const GRIEVANCE_CATEGORIES = ["Electricity","Water Supply","Roads","Sanitation","Health","Education","Others"];

export const submitGrievance = async (req, res) => {
  try {
    const { category, subject, description, isAnonymous, name, phone, location } = req.body;
    const grievanceId = "GRV" + crypto.randomBytes(4).toString("hex").toUpperCase();
    const attachments = (req.files || []).map(f => ({ fileName: f.originalname, fileUrl: f.path, fileType: f.mimetype.includes("image") ? "image" : "pdf" }));
    const grievance = await Grievance.create({
      grievanceId, userId: req.user.id, category, subject, description, attachments,
      isAnonymous: isAnonymous === "true" || isAnonymous === true,
      contactInfo: (isAnonymous === "true" || isAnonymous === true) ? {} : { name, phone },
      location: location || "",
    });
    const io = req.app.get("io");
    if (io) io.to(`user_${req.user.id}`).emit("grievance:submitted", { grievanceId: grievance.grievanceId });
    return sendSuccess(res, "Grievance submitted successfully", { grievanceId: grievance.grievanceId }, 201);
  } catch (err) { return sendError(res, err.message); }
};

export const getMyGrievances = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { userId: req.user.id };
    if (status && status !== "All") filter.status = status;
    const skip = (Number(page) - 1) * Number(limit);
    const [grievances, total] = await Promise.all([
      Grievance.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Grievance.countDocuments(filter),
    ]);
    return res.json({ success: true, data: grievances, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) } });
  } catch (err) { return sendError(res, err.message); }
};

export const getGrievanceById = async (req, res) => {
  try {
    const grievance = await Grievance.findOne({ _id: req.params.id, userId: req.user.id });
    if (!grievance) return sendError(res, "Grievance not found", 404);
    return sendSuccess(res, "Grievance fetched", grievance);
  } catch (err) { return sendError(res, err.message); }
};

export const trackByGrievanceId = async (req, res) => {
  try {
    const grievance = await Grievance.findOne({ grievanceId: req.params.grievanceId, userId: req.user.id });
    if (!grievance) return sendError(res, "Grievance not found", 404);
    return sendSuccess(res, "Grievance tracked", grievance);
  } catch (err) { return sendError(res, err.message); }
};

export const getGrievanceCategories = async (req, res) =>
  sendSuccess(res, "Categories fetched", GRIEVANCE_CATEGORIES);
