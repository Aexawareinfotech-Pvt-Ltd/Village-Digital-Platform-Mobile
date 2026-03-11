import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  organization: String,
  ownerName:    String,
  ownerContact: String,
  description:  String,
  requirements: [String],
  category:     String,
  salary:       String,
  location:     String,
  experience:   String,
  jobType:      { type: String, enum: ["Government","Private","Contract","Permanent","Temporary"] },
  logo:         { type: String, default: "" },
  postedDate:   { type: Date, default: Date.now },
  deadlineDate: Date,
  applicationLink: String,
  createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status:       { type: String, enum: ["pending","approved","rejected"], default: "pending" },
  isGovernment: { type: Boolean, default: false },
  isActive:     { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.model("Job", jobSchema);
