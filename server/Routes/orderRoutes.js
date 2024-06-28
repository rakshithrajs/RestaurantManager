//setting up routes for orders
import express from "express";
const router = express.Router();
import {
    getOrders,
    addOrder,
    deleteOrder,
    deleteAll,
    getOrderByTable,
} from "../controllers/placeOrder.js";

router.route("/").get(getOrders).post(addOrder);
router.route("/:id").delete(deleteOrder);
router.delete("/all/:id", deleteAll);
router.get("/table/:id", getOrderByTable);

export default router;
