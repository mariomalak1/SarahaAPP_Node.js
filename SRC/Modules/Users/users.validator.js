import { check} from "express-validator";

import validator from "../../Middlewares/validator.middleware.js";
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


export const updateProfiledValidator = [
    check("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 3 })
        .withMessage("too short name")
        .isLength({ max: 50 })
        .withMessage("too long name"),

    validator
]

export const deleteAccountValidator = [
    check("password")
        .notEmpty()
        .withMessage("password is required"),

    validator
]
