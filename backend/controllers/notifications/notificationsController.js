import Notification from "../../models/Notification/Notification.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const getMyNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const userId = req.user.id;
    const filter = { $or: [{ isGlobal: true }, { targetUsers: userId }] };
    const skip = (Number(page) - 1) * Number(limit);
    const [notifications, total] = await Promise.all([
      Notification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Notification.countDocuments(filter),
    ]);
    const enriched = notifications.map(n => ({ ...n, isRead: n.readBy?.map(String).includes(userId) }));
    const unreadCount = enriched.filter(n => !n.isRead).length;
    return res.json({ success: true, data: enriched, unreadCount, pagination: { page: Number(page), limit: Number(limit), total } });
  } catch (err) { return sendError(res, err.message); }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { $addToSet: { readBy: req.user.id } });
    return sendSuccess(res, "Marked as read");
  } catch (err) { return sendError(res, err.message); }
};

export const markAllAsRead = async (req, res) => {
  try {
    const uid = req.user.id;
    await Notification.updateMany(
      { $or: [{ isGlobal: true }, { targetUsers: uid }], readBy: { $ne: uid } },
      { $addToSet: { readBy: uid } }
    );
    return sendSuccess(res, "All marked as read");
  } catch (err) { return sendError(res, err.message); }
};

export const getUnreadCount = async (req, res) => {
  try {
    const uid = req.user.id;
    const count = await Notification.countDocuments({
      $or: [{ isGlobal: true }, { targetUsers: uid }],
      readBy: { $ne: uid },
    });
    return sendSuccess(res, "Unread count fetched", { count });
  } catch (err) { return sendError(res, err.message); }
};
