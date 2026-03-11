import mongoose from "mongoose";
const localServiceSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  phone:     String,
  address:   String,
  hours:     String,
  services:  String,
  category:  { type: String, enum: ["health","police","education","government","utilities"], required: true },
  latitude:  Number,
  longitude: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
export default mongoose.model("LocalService", localServiceSchema);
