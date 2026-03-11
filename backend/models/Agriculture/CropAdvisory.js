import mongoose from "mongoose";
const cropAdvisorySchema = new mongoose.Schema({
  cropName:          { type: String, required: true },
  season:            { type: String, enum: ["kharif","rabi","zaid"], required: true },
  sowingTime:        String,
  seedGuidance:      String,
  fertilizerAdvice:  String,
  irrigationAdvice:  String,
  pestControl:       String,
  weatherPrecaution: String,
  harvesting:        String,
  dosAndDonts:       String,
  isActive:          { type: Boolean, default: true },
  createdBy:         { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
export default mongoose.model("CropAdvisory", cropAdvisorySchema);
