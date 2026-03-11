import mongoose from "mongoose";
const irrigationSchema = new mongoose.Schema({
  cropName:     { type: String, required: true },
  timing:       String,
  waterQuantity:String,
  specialAlert: String,
  createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
export default mongoose.model("Irrigation", irrigationSchema);
