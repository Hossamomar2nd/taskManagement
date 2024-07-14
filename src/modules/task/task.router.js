import { Router } from "express";
import * as taskController from "./task.controller.js";
import * as taskSchema from "./task.schema.js"
import { allowedTo, protectedroutes } from "../auth/auth.controller.js";
import { uploadSingleFile } from "../../services/fileUpload.js";
import validation from "../../midlleware/validation.js";
///////////////////////////////////////////////////////////////////////////////////////////////
const router = Router();

router
    .route("/")
    .post(protectedroutes, uploadSingleFile("img"), validation(taskSchema.addTask), taskController.addTask)
    .get(taskController.getAllTasks)
router
    .route("/:id")
    .put(protectedroutes, uploadSingleFile("img"), validation(taskSchema.updateTask), taskController.updateTask)
    .delete(validation(taskSchema.paramsIdval), taskController.deleteTask)
export default router