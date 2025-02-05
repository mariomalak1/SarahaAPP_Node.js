import {Router} from "express"; 

import { verifyToken } from "../Utilis/userToken.js";

import {editMessagePrivacyValidator, sendMessageForUserValidator, deleteMessageValidator} from "../Middlewares/validators/messages.validator.js";

import {sendMessageForUser, editMessagePrivacy, getAllMessages, deleteMessage} from "../Controllers/messages.controller.js";

export const router = Router();

router.get("/", verifyToken, getAllMessages);
router.patch("/", verifyToken, editMessagePrivacyValidator, editMessagePrivacy);
router.delete("/", verifyToken, deleteMessageValidator, deleteMessage);
router.post("/", sendMessageForUserValidator, sendMessageForUser);
