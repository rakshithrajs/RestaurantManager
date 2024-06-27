//setting up routes for orders
import express from "express";
const router = express.Router();
import { getOrders, addOrder, deleteOrder } from "../controllers/placeOrder.js";

router.route("/").get(getOrders).post(addOrder);
router.route("/:id").delete(deleteOrder);

export default router;
