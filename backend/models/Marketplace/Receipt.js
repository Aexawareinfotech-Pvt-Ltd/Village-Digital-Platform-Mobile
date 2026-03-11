import mongoose from "mongoose";
const receiptSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: "Marketplace", required: true },
  seller:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  buyer:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount:   { type: Number, required: true },
  razorpayPaymentId: String,
  razorpayOrderId:   String,
  deliveryAddress: {
    fullName: String, phone: String, addressLine1: String,
    addressLine2: String, city: String, state: String, pincode: String,
  },
  deliveryStatus: { type: String, enum: ["pending","shipped","delivered"], default: "pending" },
}, { timestamps: true });
export default mongoose.model("Receipt", receiptSchema);
