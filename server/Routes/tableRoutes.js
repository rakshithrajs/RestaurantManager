import express from "express";

import {
    getTables,
    getOneTable,
    addTable,
    deleteTable,
} from "../controllers/tables.js";

import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.route("/").get(getTables).post(addTable);
router.route("/:id").get(getOneTable).delete(deleteTable);

export default router;
