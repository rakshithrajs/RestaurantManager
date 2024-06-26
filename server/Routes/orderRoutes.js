//setting up routes for orders
import express from "express";
const router = express.Router();
import { getOrders, addOrder } from "../controllers/placeOrder.js";

router.route("/").get(getOrders).post(addOrder);

export default router;
