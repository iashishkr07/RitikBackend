import express from "express";
import {
  createBusinessIdea,
  getBusinessIdeas,
  getBusinessIdeaById,
  updateBusinessIdea,
  deleteBusinessIdea,
} from "../controllers/businessIdeaController.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

// Create a new business idea
router.post("/business-ideas", uploadImage, createBusinessIdea);

// Get all business ideas
router.get("/business-ideas", getBusinessIdeas);

// Get a single business idea by ID
router.get("/business-ideas/:id", getBusinessIdeaById);

// Update a business idea by ID
router.put("/business-ideas/:id", updateBusinessIdea);

// Delete a business idea by ID
router.delete("/business-ideas/:id", deleteBusinessIdea);

export default router;
