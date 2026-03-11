import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name:             { type: String, required: true, trim: true },
  phone:            { type: String, required: true, unique: true, trim: true },
  email:            { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash:     { type: String, required: true },
  role:             { type: String, enum: ["User","Admin"], default: "User" },
  isVerified:       { type: Boolean, default: false },
  resetPasswordToken:  String,
  resetPasswordExpire: Date,
  lastActive:       { type: Date, default: Date.now },
  bio:              { type: String, default: "" },
  village:          { type: String, default: "" },
  address:          { type: String, default: "" },
  pincode:          { type: String, default: "" },
  profilePicture:   { type: String, default: "" },
  fcmToken:         { type: String, default: "" },
  savedItems:       [{ type: mongoose.Schema.Types.ObjectId, ref: "Marketplace" }],
  savedJobs:        [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  savedEvents:      [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  notificationSettings: {
    email: { type: Boolean, default: true },
    push:  { type: Boolean, default: true },
    sms:   { type: Boolean, default: false },
  },
}, { timestamps: true });
export default mongoose.model("User", userSchema);
