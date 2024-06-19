import express from "express";
import {
    addMenuItems,
    getMenuItems,
    updateMenuItmes,
    getOneItem,
} from "../contorllers/menu.js";
const router = express.Router();

router.route("/").get(getMenuItems).post(addMenuItems);
router
    .route("/:id")
    .get(getOneItem)
    .put(updateMenuItmes)
    .delete((req, res) => {
        res.send("deleted");
    });

export default router;
