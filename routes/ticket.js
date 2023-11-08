import express from "express";
import {
    ADD_TICKET,
    BUY_TICKET
} from "../controllers/ticket.js"
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", authenticateUser, ADD_TICKET);
router.put("/buy/:id", authenticateUser, BUY_TICKET);

export default router;