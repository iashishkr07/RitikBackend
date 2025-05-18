import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/order", createOrder);
router.get("/orders", getOrders);
router.get("/order/id/:id", getOrderById);
router.patch("/orders/:orderId/status", updateOrderStatus);

export default router;
