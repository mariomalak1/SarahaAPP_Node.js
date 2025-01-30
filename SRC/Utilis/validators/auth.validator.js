import { param, check} from "express-validator";

import validator from "../../Middlewares/validator.middleware.js";
import {UserModel} from "../../../DB/Models/user.model.js";

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
        .withMessage("must provide valid email")

        .custom(async value => {
            const user = await UserModel.findOne({where : { email : value}});
            if (user) {
              throw new Error('this email is already exists');
            }
          }),
    
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

