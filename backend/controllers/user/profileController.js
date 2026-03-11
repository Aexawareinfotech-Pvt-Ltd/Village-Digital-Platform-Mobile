import User from "../../models/User/User.js";
import Marketplace from "../../models/Marketplace/Marketplace.js";
import Grievance from "../../models/Grievance/Grievance.js";
import Job from "../../models/Job/Job.js";
import { sendSuccess, sendError } from "../../utils/response.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash -resetPasswordToken -resetPasswordExpire");
    if (!user) return sendError(res, "User not found", 404);
    return sendSuccess(res, "Profile fetched", user);
  } catch (err) { return sendError(res, err.message); }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, bio, village, address, pincode } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { name, phone, bio, village, address, pincode, lastActive: new Date() } },
      { new: true, runValidators: true }
    ).select("-passwordHash -resetPasswordToken -resetPasswordExpire");
    return sendSuccess(res, "Profile updated", updated);
  } catch (err) { return sendError(res, err.message); }
};

// UPLOAD PROFILE PICTURE
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) return sendError(res, "No image uploaded", 400);
    const profilePicture = req.file.path;
    const user = await User.findByIdAndUpdate(req.user.id, { profilePicture }, { new: true }).select("-passwordHash");
    return sendSuccess(res, "Profile picture updated", { profilePicture, user });
  } catch (err) { return sendError(res, err.message); }
};

// UPDATE FCM TOKEN
export const updateFCMToken = async (req, res) => {
  try {
    const { fcmToken } = req.body;
    await User.findByIdAndUpdate(req.user.id, { fcmToken });
    return sendSuccess(res, "FCM token updated");
  } catch (err) { return sendError(res, err.message); }
};

// UPDATE NOTIFICATION SETTINGS
export const updateNotificationSettings = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { notificationSettings: req.body }, { new: true });
    return sendSuccess(res, "Notification settings updated", user.notificationSettings);
  } catch (err) { return sendError(res, err.message); }
};

// GET MY LISTINGS
export const getMyListings = async (req, res) => {
  try {
    const listings = await Marketplace.find({ owner: req.user.id, hiddenBySeller: false }).sort({ createdAt: -1 });
    return sendSuccess(res, "Listings fetched", listings);
  } catch (err) { return sendError(res, err.message); }
};

// GET SAVED ITEMS
export const getSavedItems = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({ path: "savedItems", match: { approvalStatus: "approved" } });
    return sendSuccess(res, "Saved items fetched", user.savedItems);
  } catch (err) { return sendError(res, err.message); }
};

// GET SAVED JOBS
export const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({ path: "savedJobs", match: { isActive: true, status: "approved" } });
    return sendSuccess(res, "Saved jobs fetched", user.savedJobs);
  } catch (err) { return sendError(res, err.message); }
};

// GET SAVED EVENTS
export const getSavedEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedEvents");
    return sendSuccess(res, "Saved events fetched", user.savedEvents);
  } catch (err) { return sendError(res, err.message); }
};

// GET PROFILE STATS
export const getProfileStats = async (req, res) => {
  try {
    const uid = req.user.id;
    const [listings, grievances] = await Promise.all([
      Marketplace.countDocuments({ owner: uid }),
      Grievance.countDocuments({ userId: uid }),
    ]);
    return sendSuccess(res, "Stats fetched", { listings, grievances });
  } catch (err) { return sendError(res, err.message); }
};
