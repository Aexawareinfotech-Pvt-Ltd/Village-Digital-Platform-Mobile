import Event from "../../models/Event/Event.js";
import EventRegistration from "../../models/Event/EventRegistration.js";
import Ticket from "../../models/Event/Ticket.js";
import User from "../../models/User/User.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const getAllEvents = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category && category !== "All") filter.category = category;
    const skip = (Number(page) - 1) * Number(limit);
    const [events, total] = await Promise.all([
      Event.find(filter).sort({ startDate: 1 }).skip(skip).limit(Number(limit)),
      Event.countDocuments(filter),
    ]);
    return res.json({ success: true, data: events, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) } });
  } catch (err) { return sendError(res, err.message); }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return sendError(res, "Event not found", 404);
    const registrationCount = await EventRegistration.countDocuments({ eventId: req.params.id });
    let isRegistered = false, isSaved = false;
    if (req.user) {
      const [reg, user] = await Promise.all([
        EventRegistration.findOne({ eventId: req.params.id, userId: req.user.id }),
        User.findById(req.user.id),
      ]);
      isRegistered = !!reg;
      isSaved = user?.savedEvents?.map(String).includes(req.params.id) || false;
    }
    return sendSuccess(res, "Event fetched", { ...event.toObject(), registrationCount, isRegistered, isSaved });
  } catch (err) { return sendError(res, err.message); }
};

export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return sendError(res, "Event not found", 404);
    if (!event.registrationOpen) return sendError(res, "Registration is closed", 400);
    const already = await EventRegistration.findOne({ eventId: req.params.id, userId: req.user.id });
    if (already) return sendError(res, "Already registered", 400);
    const count = await EventRegistration.countDocuments({ eventId: req.params.id });
    if (event.maxAttendees && count >= event.maxAttendees) return sendError(res, "Event is full", 400);
    const { name, email, phone } = req.body;
    const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const registration = await EventRegistration.create({ eventId: req.params.id, userId: req.user.id, name, email, phone, ticketId });
    await Ticket.create({ ticketId, eventId: req.params.id, userId: req.user.id, registrationId: registration._id, eventName: event.eventName, venue: event.venue, eventDate: event.startDate, userName: name });
    const io = req.app.get("io");
    if (io) io.to(`user_${req.user.id}`).emit("notification:new", { title: "Registration Confirmed", message: `You are registered for ${event.eventName}`, type: "event" });
    return sendSuccess(res, "Registration successful", { registration, ticketId }, 201);
  } catch (err) { return sendError(res, err.message); }
};

export const cancelRegistration = async (req, res) => {
  try {
    const reg = await EventRegistration.findOneAndDelete({ eventId: req.params.id, userId: req.user.id });
    if (!reg) return sendError(res, "Registration not found", 404);
    await Ticket.findOneAndDelete({ registrationId: reg._id });
    return sendSuccess(res, "Registration cancelled");
  } catch (err) { return sendError(res, err.message); }
};

export const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await EventRegistration.find({ userId: req.user.id }).populate("eventId").sort({ registeredAt: -1 });
    return sendSuccess(res, "Registrations fetched", registrations);
  } catch (err) { return sendError(res, err.message); }
};

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id }).populate("eventId").sort({ createdAt: -1 });
    return sendSuccess(res, "Tickets fetched", tickets);
  } catch (err) { return sendError(res, err.message); }
};

export const toggleInterest = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return sendError(res, "Event not found", 404);
    const uid = req.user.id;
    const idx = event.interestedUsers.map(String).indexOf(uid);
    if (idx > -1) event.interestedUsers.splice(idx, 1);
    else event.interestedUsers.push(uid);
    await event.save();
    return sendSuccess(res, "Interest updated", { interestedCount: event.interestedUsers.length, interested: idx === -1 });
  } catch (err) { return sendError(res, err.message); }
};

export const toggleSaveEvent = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const eventId = req.params.id;
    const saved = user.savedEvents.map(String);
    const idx = saved.indexOf(eventId);
    if (idx > -1) user.savedEvents.splice(idx, 1);
    else user.savedEvents.push(eventId);
    await user.save();
    return sendSuccess(res, idx === -1 ? "Event saved" : "Event unsaved", { saved: idx === -1 });
  } catch (err) { return sendError(res, err.message); }
};

export const getEventCategories = async (req, res) => {
  try {
    const categories = await Event.distinct("category");
    return sendSuccess(res, "Categories fetched", ["All", ...categories]);
  } catch (err) { return sendError(res, err.message); }
};
