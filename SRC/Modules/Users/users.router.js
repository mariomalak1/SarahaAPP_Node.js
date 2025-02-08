import {Router} from "express"; 

import { updateMail, updatePassword, updateProfile, deleteAccount} from "./users.controller.js";
import { updateMailValidator, updatePasswordValidator , updateProfiledValidator, deleteAccountValidator}
 from "./users.validator.js";

export const router = Router();

router.patch("/updateMail/", updateMailValidator, updateMail);
router.patch("/updatePassword/", updatePasswordValidator, updatePassword);
router.patch("/updateProfile/", updateProfiledValidator, updateProfile);
router.delete("/deleteAccount/", deleteAccountValidator, deleteAccount);
