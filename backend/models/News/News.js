import mongoose from "mongoose";
const newsSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, enum: ["Administrative","Event","Emergency","Health","Education","Infrastructure","Agriculture"], required: true },
  status:      { type: String, enum: ["draft","published"], default: "published" },
  publishDate: { type: Date, default: Date.now },
  expiryDate:  Date,
  featured:    { type: Boolean, default: false },
  attachments: [{ fileName: String, fileUrl: String, fileType: String }],
  views:       { type: Number, default: 0 },
  likes:       [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
export default mongoose.model("News", newsSchema);
