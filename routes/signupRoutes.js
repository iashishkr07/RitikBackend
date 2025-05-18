import express from "express";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log("Signup route hit:", {
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers,
  });
  next();
});

router.post("/signup", createUser);

export default router;
