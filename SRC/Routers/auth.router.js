import {Router} from "express"; 

import {registerValidator, verfiyEmailValidator, loginValidator,
    forgetPasswordValidator, verfiyCodeSendChangePasswordValidator
 } from "../Middlewares/validators/auth.validator.js";
import {register, login, verfiyEmail, forgetPassword, verfiyCodeSendChangePassword}
 from "../Controllers/auth.controller.js";

export const router = Router();

router.post("/register/", registerValidator, register);
router.post("/verfiyMail/", verfiyEmailValidator, verfiyEmail);
router.post("/login/", loginValidator, login);
router.post("/forgetPassword/", forgetPasswordValidator, forgetPassword);
router.post("/verfiyCodeChangePassword/", verfiyCodeSendChangePasswordValidator, verfiyCodeSendChangePassword);