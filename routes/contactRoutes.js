import express from "express";
import {
  createContact,
  getContacts,
} from "../controllers/contactController.js";

const router = express.Router();

// Create a new contact
router.post("/contacts", createContact);

// Get all contacts
router.get("/contacts", getContacts);

export default router;
