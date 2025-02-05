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
        .withMessage("user email is required")
        .isEmail()
        .withMessage("must provide valid email"),
        
    check("content")
        .notEmpty()
        .withMessage("message content is required")
        .isLength({min: 1})
        .withMessage("message content is too short")
        .isLength({max: 3000})
        .withMessage("message content is too long"),
        
    check("anonymousName")
        .isLength({min: 1})
        .withMessage("anonymous name is too short")
        .isLength({max: 50})
        .withMessage("anonymous name is too long"),
    
        
    validator
]