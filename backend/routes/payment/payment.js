import express from "express";
import { createOrder, verifyPayment, getMyReceipts } from "../../controllers/payment/paymentController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();
router.use(authMiddleware);
router.post("/create-order",  createOrder);
router.post("/verify",        verifyPayment);
router.get("/receipts",       getMyReceipts);
export default router;
