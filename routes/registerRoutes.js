import express from "express";
import {
  createRegister,
  getRegisters,
  getRegisterById,
  updateRegister,
  deleteRegister,
} from "../controllers/registerController.js";

const router = express.Router();

// Create a new register
router.post("/registers", createRegister);

// Get all registers
router.get("/registers", getRegisters);

// Get a single register by ID
router.get("/registers/:id", getRegisterById);

// Update a register by ID
router.put("/registers/:id", updateRegister);

// Delete a register by ID
router.delete("/registers/:id", deleteRegister);

export default router;
