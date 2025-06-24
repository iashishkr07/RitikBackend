import User from "../models/registerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const adminLogin = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    // Check against environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      return res
        .status(500)
        .json({ error: "Admin credentials not set in environment variables" });
    }
    if (Email !== adminEmail || Password !== adminPassword) {
      return res
        .status(401)
        .json({ error: "Invalid credentials or not an admin" });
    }
    // Generate a token (no DB user, so minimal info)
    const token = jwt.sign(
      { email: adminEmail, isAdmin: true },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );
    res.json({
      token,
      user: { email: adminEmail, isAdmin: true },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
