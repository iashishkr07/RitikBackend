import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/registerController.js";

const router = express.Router();

// Create a new register
router.post("/registers", createUser);

// Get all registers
router.get("/registers", getUsers);

// Get a single register by ID
router.get("/registers/:id", getUserById);

// Update a register by ID
router.put("/registers/:id", updateUser);

// Delete a register by ID
router.delete("/registers/:id", deleteUser);

export default router;
