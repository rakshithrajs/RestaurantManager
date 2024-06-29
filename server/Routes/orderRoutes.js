//setting up routes for orders
import express from "express";
const router = express.Router();
import {
    getOrders,
    addOrder,
    deleteOrder,
    deleteAll,
    getOrderByTable,
    updateOrder
} from "../controllers/placeOrder.js";

router.route("/").get(getOrders).post(addOrder);
router.route("/:id").delete(deleteOrder).put(updateOrder);
router.delete("/all/:id", deleteAll);
router.get("/table/:id", getOrderByTable);

export default router;
