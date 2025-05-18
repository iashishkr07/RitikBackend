import express from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()

const router = express.Router();

const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = process.env;

router.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});

export default router;
