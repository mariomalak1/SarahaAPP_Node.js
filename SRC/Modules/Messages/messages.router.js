import {Router} from "express"; 

import { verifyToken } from "../../Utilis/userToken.js";

import {editMessagePrivacyValidator, sendMessageForUserValidator, deleteMessageValidator} from "./messages.validator.js";

import {sendMessageForUser, editMessagePrivacy, getAllMessages, deleteMessage} from "./messages.controller.js";

export const router = Router();

router.get("/", verifyToken, getAllMessages);
router.patch("/", verifyToken, editMessagePrivacyValidator, editMessagePrivacy);
router.delete("/", verifyToken, deleteMessageValidator, deleteMessage);
router.post("/", sendMessageForUserValidator, sendMessageForUser);
