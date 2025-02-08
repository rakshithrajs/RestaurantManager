import { authCheck, login, logout, signup } from "../controllers/auth.js";

import { requireAuth } from "../middleware/requireAuth.js";

import express from "express";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.use(requireAuth)

router.get("/authCheck", authCheck);


export default router;