import mongoose from "mongoose";
const eventRegistrationSchema = new mongoose.Schema({
  eventId:     { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name:        String,
  email:       String,
  phone:       String,
  status:      { type: String, enum: ["confirmed","cancelled"], default: "confirmed" },
  ticketId:    { type: String, default: "" },
  registeredAt:{ type: Date, default: Date.now },
}, { timestamps: true });
export default mongoose.model("EventRegistration", eventRegistrationSchema);
