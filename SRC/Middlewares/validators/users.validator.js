import { check} from "express-validator";

import validator from "../validator.middleware.js";
import {UserModel} from "../../../DB/Models/user.model.js";

export const updateMailValidator = [
    check("newEmail")
        .notEmpty()
        .withMessage("new email is required")
        .isEmail()
        .withMessage("must provide valid email"),
        
    validator
]


export const updatePasswordValidator = [
    check("newPassword")
        .notEmpty()
        .withMessage("newPassword is required")
        .isLength({min: 8})
        .withMessage("newPassword min len 8")
        .isLength({max: 60})
        .withMessage("newPassword max len 60"),
        
    check("password")
        .notEmpty()
        .withMessage("newPassword is required"),

    validator
]
