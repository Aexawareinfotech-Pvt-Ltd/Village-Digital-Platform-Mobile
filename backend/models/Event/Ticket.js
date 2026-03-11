import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema({
  ticketId:      { type: String, required: true, unique: true },
  eventId:       { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  registrationId:{ type: mongoose.Schema.Types.ObjectId, ref: "EventRegistration" },
  eventName:     String,
  venue:         String,
  eventDate:     Date,
  userName:      String,
  isUsed:        { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.model("Ticket", ticketSchema);
