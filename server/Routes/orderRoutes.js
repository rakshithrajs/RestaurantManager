//setting up routes for orders
import express from "express";
const router = express.Router();
import {
    getOrders,
    addOrder,
    deleteOrder,
    deleteAll,
    updateOrder,
    getOneOrder,
} from "../controllers/placeOrder.js";

router.route("/").get(getOrders).post(addOrder);
router.route("/:id").get(getOneOrder).delete(deleteOrder).put(updateOrder);
router.delete("/all/:id", deleteAll);

export default router;
