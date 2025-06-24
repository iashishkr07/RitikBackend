import BusinessIdea from "../models/BusinessIdea.js";

// Create a new business idea
export const createBusinessIdea = async (req, res) => {
  try {
    const businessIdea = new BusinessIdea(req.body);
    await businessIdea.save();
    res.status(201).json(businessIdea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all business ideas
export const getBusinessIdeas = async (req, res) => {
  try {
    const businessIdeas = await BusinessIdea.find();
    res.json(businessIdeas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single business idea by ID
export const getBusinessIdeaById = async (req, res) => {
  try {
    const businessIdea = await BusinessIdea.findById(req.params.id);
    if (!businessIdea)
      return res.status(404).json({ error: "Business idea not found" });
    res.json(businessIdea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a business idea by ID
export const updateBusinessIdea = async (req, res) => {
  try {
    const businessIdea = await BusinessIdea.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!businessIdea)
      return res.status(404).json({ error: "Business idea not found" });
    res.json(businessIdea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a business idea by ID
export const deleteBusinessIdea = async (req, res) => {
  try {
    const businessIdea = await BusinessIdea.findByIdAndDelete(req.params.id);
    if (!businessIdea)
      return res.status(404).json({ error: "Business idea not found" });
    res.json({ message: "Business idea deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
