import mongoose from "mongoose";

const BusinessIdeaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    materials: [{ type: String, required: true }],
    cost: { type: String, required: true },
    steps: [{ type: String, required: true }],
    description: { type: String },
  },
  { timestamps: true, collection: "businessideas" }
);

const BusinessIdea = mongoose.model("BusinessIdea", BusinessIdeaSchema);
export default BusinessIdea;
