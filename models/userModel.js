import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    FullName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Phone: { type: String },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
