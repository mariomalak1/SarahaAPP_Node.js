import {Router} from "express"; 

import { verifyToken } from "../Utilis/userToken.js";

import {editMessagePrivacyValidator, sendMessageForUserValidator} from "../Middlewares/validators/messages.validator.js";

import {sendMessageForUser, editMessagePrivacy, getAllMessages} from "../Controllers/messages.controller.js";

export const router = Router();

router.get("/", verifyToken, getAllMessages);
router.patch("/", verifyToken, editMessagePrivacyValidator, editMessagePrivacy);
router.post("/", sendMessageForUserValidator, sendMessageForUser);
