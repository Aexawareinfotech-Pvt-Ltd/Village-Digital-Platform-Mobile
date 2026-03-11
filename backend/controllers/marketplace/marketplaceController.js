import Marketplace from "../../models/Marketplace/Marketplace.js";
import User from "../../models/User/User.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const getAllListings = async (req, res) => {
  try {
    const { category, type, search, page = 1, limit = 10 } = req.query;
    const filter = { approvalStatus: "approved", status: "active", hiddenBySeller: false };
    if (category && category !== "All") filter.category = category;
    if (type) filter.type = type;
    if (search) filter.title = { $regex: search, $options: "i" };
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Marketplace.find(filter).populate("owner", "name phone profilePicture").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Marketplace.countDocuments(filter),
    ]);
    return res.json({ success: true, data: items, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) } });
  } catch (err) { return sendError(res, err.message); }
};

export const getListingById = async (req, res) => {
  try {
    const item = await Marketplace.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true }).populate("owner", "name phone email profilePicture");
    if (!item) return sendError(res, "Listing not found", 404);
    return sendSuccess(res, "Listing fetched", item);
  } catch (err) { return sendError(res, err.message); }
};

export const createListing = async (req, res) => {
  try {
    const images = (req.files || []).map(f => ({ url: f.path, publicId: f.filename }));
    const { title, price, priceValue, location, phone, description, type, category } = req.body;
    const item = await Marketplace.create({ title, price, priceValue: priceValue||0, location, phone, description, type, category, images, owner: req.user.id, approvalStatus: "pending" });
    const io = req.app.get("io");
    if (io) io.to(`user_${req.user.id}`).emit("listing:created", { itemId: item._id });
    return sendSuccess(res, "Listing submitted for approval", item, 201);
  } catch (err) { return sendError(res, err.message); }
};

export const updateListing = async (req, res) => {
  try {
    const item = await Marketplace.findById(req.params.id);
    if (!item) return sendError(res, "Listing not found", 404);
    if (item.owner.toString() !== req.user.id) return sendError(res, "Unauthorized", 403);
    const data = { ...req.body };
    if (req.files?.length) data.images = req.files.map(f => ({ url: f.path, publicId: f.filename }));
    const updated = await Marketplace.findByIdAndUpdate(req.params.id, data, { new: true });
    return sendSuccess(res, "Listing updated", updated);
  } catch (err) { return sendError(res, err.message); }
};

export const deleteListing = async (req, res) => {
  try {
    const item = await Marketplace.findById(req.params.id);
    if (!item) return sendError(res, "Listing not found", 404);
    if (item.owner.toString() !== req.user.id) return sendError(res, "Unauthorized", 403);
    item.hiddenBySeller = true;
    await item.save();
    return sendSuccess(res, "Listing removed");
  } catch (err) { return sendError(res, err.message); }
};

export const getMyListings = async (req, res) => {
  try {
    const items = await Marketplace.find({ owner: req.user.id, hiddenBySeller: false }).sort({ createdAt: -1 });
    return sendSuccess(res, "Your listings fetched", items);
  } catch (err) { return sendError(res, err.message); }
};

export const toggleSaveListing = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const itemId = req.params.id;
    const saved = user.savedItems.map(String);
    const idx = saved.indexOf(itemId);
    if (idx > -1) user.savedItems.splice(idx, 1);
    else user.savedItems.push(itemId);
    await user.save();
    return sendSuccess(res, idx === -1 ? "Saved" : "Removed from saved", { saved: idx === -1 });
  } catch (err) { return sendError(res, err.message); }
};

export const getSavedListings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({ path: "savedItems", match: { approvalStatus: "approved" } });
    return sendSuccess(res, "Saved listings fetched", user.savedItems);
  } catch (err) { return sendError(res, err.message); }
};

export const getSellerContact = async (req, res) => {
  try {
    const item = await Marketplace.findById(req.params.id).populate("owner", "name phone email");
    if (!item) return sendError(res, "Listing not found", 404);
    return sendSuccess(res, "Contact fetched", { name: item.owner.name, phone: item.phone || item.owner.phone, email: item.owner.email });
  } catch (err) { return sendError(res, err.message); }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Marketplace.distinct("category", { approvalStatus: "approved", status: "active" });
    return sendSuccess(res, "Categories fetched", ["All", ...categories]);
  } catch (err) { return sendError(res, err.message); }
};
