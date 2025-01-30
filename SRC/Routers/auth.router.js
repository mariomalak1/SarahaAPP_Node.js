import {Router} from "express"; 

import {registerValidator, loginValidator} from "../Utilis/validators/auth.validator.js";
import {register, login} from "../Controllers/auth.controller.js";

export const router = Router();

router.post("/register/", registerValidator, register);
router.post("/login/", loginValidator, login);