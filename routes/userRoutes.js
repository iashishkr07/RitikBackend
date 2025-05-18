import express from "express";
import {
  createUser,
  getMe,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", createUser);
router.get('/me', verifyToken, getMe);

export default router;
