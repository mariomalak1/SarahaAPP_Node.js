import {Router} from "express"; 

import {verifyToken} from "../../Utilis/userToken.js";
import { updateMail, updatePassword, updateProfile, deleteAccount} from "./users.controller.js";
import { updateMailValidator, updatePasswordValidator , updateProfiledValidator, deleteAccountValidator}
 from "./users.validator.js";

export const router = Router();

router.patch("/updateMail/", verifyToken, updateMailValidator, updateMail);
router.patch("/updatePassword/", verifyToken, updatePasswordValidator, updatePassword);
router.patch("/updateProfile/", verifyToken, updateProfiledValidator, updateProfile);
router.delete("/deleteAccount/", verifyToken, deleteAccountValidator, deleteAccount);
