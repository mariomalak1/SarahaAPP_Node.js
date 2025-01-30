import {Router} from "express"; 

import {registerValidator} from "../Utilis/validators/auth.validator.js";
import {register, login} from "../Controllers/auth.controller.js";

export const router = Router();

router.post("/register/", registerValidator, register);