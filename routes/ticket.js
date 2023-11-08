import express from "express";
import {
    ADD_TICKET,
    BUY_TICKET
} from "../controllers/ticket.js"
import validation from "../middlewares/validation.js";
import { ticketAddSchema } from "../validation/ticketSchema.js"
import { emptySchema } from "../validation/emptySchema.js"
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", validation(ticketAddSchema), authenticateUser, ADD_TICKET);
router.put("/buy/:id", validation(emptySchema), authenticateUser, BUY_TICKET);

export default router;