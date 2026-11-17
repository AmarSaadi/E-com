import express from "express";
import orderController from "../controller/order.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/order", protect, orderController.createOrder);

export default router;