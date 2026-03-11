import mongoose from "mongoose";
const marketplaceSchema = new mongoose.Schema({
  title:           { type: String, required: true },
  price:           { type: String, required: true },
  priceValue:      { type: Number, default: 0 },
  location:        String,
  phone:           String,
  description:     String,
  type:            { type: String, enum: ["sell","rent"], required: true },
  category:        { type: String, required: true },
  images:          [{ url: String, publicId: String }],
  owner:           { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  buyer:           { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  status:          { type: String, enum: ["active","sold","rented"], default: "active" },
  approvalStatus:  { type: String, enum: ["pending","approved","rejected"], default: "pending" },
  rejectionReason: { type: String, default: "" },
  hiddenBySeller:  { type: Boolean, default: false },
  savedBy:         [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  views:           { type: Number, default: 0 },
}, { timestamps: true });
export default mongoose.model("Marketplace", marketplaceSchema);
