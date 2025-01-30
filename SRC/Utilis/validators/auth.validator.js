import { param, check} from "express-validator";

import validator from "../../Middlewares/validator.middleware.js";

export const registerValidator = [
    check("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 3 })
        .withMessage("too short product name")
        .isLength({ max: 50 })
        .withMessage("too long product name"),
    
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("must provide valid email"),
    
    check("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({min: 8})
        .withMessage("password min len 8")
        .isLength({max: 60})
        .withMessage("password max len 60"),
        
    validator
]


export const loginValidator = [  
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("must provide valid email"),
    
    check("password")
        .notEmpty()
        .withMessage("password is required"),

    validator
]

