import { Router } from "express"
import * as categoryController from "./category.controller.js";
import * as categorySchema from "./category.schema.js"
import validation from "../../midlleware/validation.js";
import { uploadSingleFile } from "../../services/fileUpload.js";
import { allowedTo, protectedroutes } from "../auth/auth.controller.js"
//////////////////////////////////////////////////////////////////
const router = Router();

router
    .route("/")
    .post(protectedroutes, allowedTo("admin"), uploadSingleFile("img"), validation(categorySchema.addCategory), categoryController.addCategory)
    .get(categoryController.getallcategories);

router
    .route("/:id")
    .get(validation(categorySchema.paramsIdval), categoryController.getsinglecategory)
    .put(protectedroutes, uploadSingleFile("img"), validation(categorySchema.updateCategory), categoryController.updatecategory)
    .delete(protectedroutes, validation(categorySchema.paramsIdval), categoryController.deletecategory);



export default router;