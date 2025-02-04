import { check} from "express-validator";

import validator from "../validator.middleware.js";
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


export const verfiyEmailValidator = [  
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("must provide valid email"),
    
    check("code")
        .notEmpty()
        .withMessage("verfication code is required"),
        
    validator
]


export const loginValidator = [  
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("must provide valid email")

        .custom(async value => {
            const user = await UserModel.findOne({where : { email : value}});
            if (!user) {
              throw new Error('not registered mail');
            }
            if(!user.isVerfied){
                throw new Error('not verfied mail');
            }
          }),

    
    check("password")
        .notEmpty()
        .withMessage("password is required"),
       
    validator
]


export const forgetPasswordValidator = [
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("must provide valid email"),

    validator
]


export const verfiyCodeSendChangePasswordValidator = [
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("must provide valid email"),

    check("newPassword")
        .notEmpty()
        .withMessage("newPassword is required")
        .isLength({min: 8})
        .withMessage("password min len 8")
        .isLength({max: 60})
        .withMessage("password max len 60"),
    
    check("resetCode")
        .notEmpty()
        .withMessage("newPassword is required"),

    validator
]

