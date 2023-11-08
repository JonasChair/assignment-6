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
import { userRegistrationSchema, userLoginSchema, userTokenRenewSchema } from "../validation/userSchema.js";
import { emptySchema } from "../validation/emptySchema.js"
import { authenticateRefreshToken, authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", validation(userRegistrationSchema), REGISTER_USER);
router.post("/login", validation(userLoginSchema), LOGIN);
router.post("/getNewToken", validation(userTokenRenewSchema), authenticateRefreshToken, REFRESH_TOKEN);
router.get("/", validation(emptySchema), authenticateUser, GET_ALL_USERS);
router.get("/withTickets", validation(emptySchema), authenticateUser, GET_ALL_USERS_WITH_TICKETS);
router.get("/withTickets/:id", validation(emptySchema), authenticateUser, GET_USER_BY_ID_WITH_TICKETS);
router.get("/:id", validation(emptySchema), authenticateUser, GET_USER_BY_ID);

export default router;