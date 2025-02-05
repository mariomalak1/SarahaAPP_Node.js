import { check} from "express-validator";

import validator from "../validator.middleware.js";

export const editMessagePrivacyValidator = [
    check("messageId")
        .notEmpty()
        .withMessage("message id is required")
        .isInt()
        .withMessage("it must be numeric value"),

    validator
]

export const sendMessageForUserValidator = [
    check("userEmail")
        .notEmpty()
        .withMessage("new email is required")
        .isEmail()
        .withMessage("must provide valid email"),
        
    validator
]