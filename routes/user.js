import express from "express";
import {
    REGISTER_USER,
    LOGIN,
    REFRESH_TOKEN,
    GET_ALL_USERS,
    GET_USER_BY_ID,
    GET_ALL_USERS_WITH_TICKETS,
    GET_USER_BY_ID_WITH_TICKETS
} from "../controllers/user.js";
import validation from "../middlewares/validation.js";
import { userRegistrationSchema } from "../validation/userSchema.js";
import {authenticateRefreshToken, authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", validation(userRegistrationSchema), REGISTER_USER);
router.post("/login", LOGIN);
router.post("/getNewToken", authenticateRefreshToken, REFRESH_TOKEN );
router.get("/", authenticateUser, GET_ALL_USERS);
router.get("/withTickets", authenticateUser, GET_ALL_USERS_WITH_TICKETS);
router.get("/withTickets/:id", authenticateUser, GET_USER_BY_ID_WITH_TICKETS);
router.get("/:id", authenticateUser, GET_USER_BY_ID);

export default router;