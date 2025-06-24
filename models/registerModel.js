import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Phone: { type: String },
    BusinessType: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
