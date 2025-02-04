import {Router} from "express"; 

import { updateMail, updatePassword, updateProfile, deleteAccount} from "../Controllers/users.controller.js";
import { updateMailValidator, updatePasswordValidator , updateProfiledValidator, deleteAccountValidator}
 from "../Middlewares/validators/users.validator.js";

export const router = Router();

router.patch("/updateMail/", updateMailValidator, updateMail);
router.patch("/updatePassword/", updatePasswordValidator, updatePassword);
router.patch("/updateProfile/", updateProfiledValidator, updateProfile);
router.delete("/deleteAccount/", deleteAccountValidator, deleteAccount);
