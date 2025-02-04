import {Router} from "express"; 

import { verifyToken } from "../Utilis/userToken.js";
import { updateMail, updatePassword} from "../Controllers/users.controller.js";
import { updateMailValidator, updatePasswordValidator }
 from "../Middlewares/validators/users.validator.js";

export const router = Router();

router.patch("/updateMail/", verifyToken, updateMailValidator, updateMail);
router.patch("/updatePassword/", verifyToken, updatePasswordValidator, updatePassword);
