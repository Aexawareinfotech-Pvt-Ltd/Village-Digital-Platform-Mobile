import express from "express";
import { getAllEvents, getEventById, registerForEvent, cancelRegistration, getMyRegistrations, getMyTickets, toggleInterest, toggleSaveEvent, getEventCategories } from "../../controllers/events/eventsController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();
// Public
router.get("/",           getAllEvents);
router.get("/categories", getEventCategories);
router.get("/:id",        getEventById);
// Auth
router.use(authMiddleware);
router.post("/:id/register",  registerForEvent);
router.delete("/:id/register",cancelRegistration);
router.post("/:id/interest",  toggleInterest);
router.post("/:id/save",      toggleSaveEvent);
router.get("/my/registrations", getMyRegistrations);
router.get("/my/tickets",       getMyTickets);
export default router;
