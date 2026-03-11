import mongoose from "mongoose";
const jobApplicationSchema = new mongoose.Schema({
  jobId:       { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name:        String,
  email:       String,
  phone:       String,
  experience:  String,
  coverLetter: String,
  resumeUrl:   String,
  status:      { type: String, enum: ["pending","shortlisted","rejected"], default: "pending" },
}, { timestamps: true });
export default mongoose.model("JobApplication", jobApplicationSchema);
