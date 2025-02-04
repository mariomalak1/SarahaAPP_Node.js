import {Router} from "express"; 

import { verifyToken } from "../Utilis/userToken.js";
import { updateMail, updatePassword, updateProfile} from "../Controllers/users.controller.js";
import { updateMailValidator, updatePasswordValidator , updateProfiledValidator}
 from "../Middlewares/validators/users.validator.js";

export const router = Router();

router.patch("/updateMail/", verifyToken, updateMailValidator, updateMail);
router.patch("/updatePassword/", verifyToken, updatePasswordValidator, updatePassword);
router.patch("/updateProfile/", verifyToken, updateProfiledValidator, updateProfile);
