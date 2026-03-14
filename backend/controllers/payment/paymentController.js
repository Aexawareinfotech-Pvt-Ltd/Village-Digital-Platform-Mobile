import getRazorpay from "../../config/razorpay.js";
import Receipt from "../../models/Marketplace/Receipt.js";
import Marketplace from "../../models/Marketplace/Marketplace.js";
import crypto from "crypto";
import { sendSuccess, sendError } from "../../utils/response.js";

export const createOrder = async (req, res) => {
  try {
    const { amount, itemId } = req.body;
    const item = await Marketplace.findById(itemId);
    if (!item || item.status !== "active") return sendError(res, "Item not available", 404);
    const order = await razorpay.orders.create({ amount: Number(amount) * 100, currency: "INR", receipt: `rcpt_${Date.now()}` });
    return sendSuccess(res, "Order created", { orderId: order.id, amount: order.amount, currency: order.currency }, 201);
  } catch (err) { return sendError(res, err.message); }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, itemId, deliveryAddress } = req.body;
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSig = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");
    if (expectedSig !== razorpaySignature) return sendError(res, "Invalid payment signature", 400);
    const item = await Marketplace.findById(itemId);
    if (!item) return sendError(res, "Item not found", 404);
    const receipt = await Receipt.create({
      product: itemId, seller: item.owner, buyer: req.user.id,
      amount: item.priceValue, razorpayPaymentId, razorpayOrderId, deliveryAddress,
    });
    item.status = "sold";
    item.buyer = req.user.id;
    await item.save();
    const io = req.app.get("io");
    if (io) {
      io.to(`user_${item.owner}`).emit("item:sold", { itemId, buyerId: req.user.id });
      io.to(`user_${req.user.id}`).emit("payment:success", { receiptId: receipt._id });
    }
    return sendSuccess(res, "Payment verified successfully", { receiptId: receipt._id });
  } catch (err) { return sendError(res, err.message); }
};

export const getMyReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find({ $or: [{ buyer: req.user.id }, { seller: req.user.id }] })
      .populate("product", "title price images")
      .populate("seller", "name phone")
      .populate("buyer", "name phone")
      .sort({ createdAt: -1 });
    return sendSuccess(res, "Receipts fetched", receipts);
  } catch (err) { return sendError(res, err.message); }
};
