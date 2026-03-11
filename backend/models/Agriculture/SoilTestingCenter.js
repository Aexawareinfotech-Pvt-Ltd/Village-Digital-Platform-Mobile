import mongoose from "mongoose";
const soilTestingCenterSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  address:      String,
  phone:        String,
  testsOffered: [String],
  latitude:     Number,
  longitude:    Number,
  createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
export default mongoose.model("SoilTestingCenter", soilTestingCenterSchema);
