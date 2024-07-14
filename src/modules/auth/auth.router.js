import { Router } from "express";
import validation from "../../midlleware/validation.js"
import * as authController from "./auth.controller.js"
import * as authSchema from "./auth.schema.js"
import { checkEmail } from "../../midlleware/checkEmail.js";
////////////////////////////////////////////////////////////

const router = Router();

router.post("/register", validation(authSchema.register), checkEmail, authController.register);
router.post("/logIn", validation(authSchema.logIn), authController.logIn);
router.put("/changePassword/:id", validation(authSchema.changePassword), authController.changePassword);

/////////////////////////////////////////////////////////////

export default router;