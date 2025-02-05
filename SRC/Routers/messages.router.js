import {Router} from "express"; 

import { verifyToken } from "../Utilis/userToken.js";
import {sendMessageForUser, editMessagePrivacy, getAllMessages} from "../Controllers/messages.controller.js";

export const router = Router();

router.get("/", verifyToken, getAllMessages);
router.patch("/", verifyToken, editMessagePrivacy);
router.post("/", sendMessageForUser);
