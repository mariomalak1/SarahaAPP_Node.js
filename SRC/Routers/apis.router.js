import {Router} from "express"; 

import { verifyToken } from "../Utilis/userToken.js";

import {router as authRouter} from "./auth.router.js";
import {router as usersRouter} from "./users.router.js";
import {router as messagesRouter} from "./messages.router.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/users", verifyToken, usersRouter);
router.use("/users", verifyToken, usersRouter);
router.use("/messages", messagesRouter);