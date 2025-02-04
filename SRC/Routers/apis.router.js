import {Router} from "express"; 

import {router as authRouter} from "./auth.router.js";
import {router as usersRouter} from "./users.router.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);