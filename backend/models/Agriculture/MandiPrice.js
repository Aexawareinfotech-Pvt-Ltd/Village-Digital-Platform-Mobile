import mongoose from "mongoose";
const mandiPriceSchema = new mongoose.Schema({
  cropName:      { type: String, required: true },
  cropNameHindi: String,
  market:        { type: String, required: true },
  price:         { type: Number, required: true },
  unit:          { type: String, default: "quintal" },
  trend:         { type: String, enum: ["up","down","stable"], default: "stable" },
  previousPrice: Number,
  date:          { type: Date, default: Date.now },
  createdBy:     { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
export default mongoose.model("MandiPrice", mandiPriceSchema);
