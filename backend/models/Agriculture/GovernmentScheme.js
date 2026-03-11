import mongoose from "mongoose";
const govSchemeSchema = new mongoose.Schema({
  schemeName:        { type: String, required: true },
  benefit:           String,
  requiredDocuments: [String],
  lastDate:          Date,
  officialWebsite:   String,
  applySteps:        String,
  eligibility:       String,
  isActive:          { type: Boolean, default: true },
  createdBy:         { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
export default mongoose.model("GovernmentScheme", govSchemeSchema);
