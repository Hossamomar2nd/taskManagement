import { Router } from "express";
import validation from "../../midlleware/validation.js";
import * as userController from "./user.controller.js";
import * as userSchema from "./user.schema.js"
import { checkEmail } from "../../midlleware/checkEmail.js";

const router = Router();

router
    .route("/")
    .post(validation(userSchema.addUser), checkEmail, userController.addUser)
    .get(userController.getAllUsers);

router
    .route("/:id")
    .get(validation(userSchema.paramsIdval), userController.getUser)
    .put(validation(userSchema.updateUser), checkEmail, userController.updateUser)
    .delete(validation(userSchema.paramsIdval), userController.deleteUser);


export default router;