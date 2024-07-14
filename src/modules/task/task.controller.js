import slugify from "slugify";
import taskModel from "../../../Database/models/task.model.js";
import { catchError } from "../../midlleware/catchError.js";
import { ApiFeature } from "../../utils/apifeature.js";
import { application } from "express";
import { AppError } from "../../utils/AppError.js";
import userModel from "../../../Database/models/user.model.js";

export const addTask = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title);
    let task = await taskModel.create({ ...req.body, category: req.body.categoryId });
    return res.status(201).json({ success: true, message: task })
})

export const getAllTasks = catchError(async (req, res, next) => {
    let ApiFeatures = new ApiFeature(taskModel.find(), req.query).filter().search().pagination().sort();
    let task = await ApiFeatures.mongooseQuery
    res.json({ success: true, page: ApiFeatures.pageNumber, message: task });
})

export const updateTask = catchError(async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    if (req.file) req.body.image = req.file.filename;
    let task = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
        return next(new AppError("task not found :(", 404));
    }
    return res.status(201).json({ success: true, message: task });
})

export const deleteTask = catchError(async (req, res, next) => {

    let task = await taskModel.findByIdAndDelete(req.params.id);

    if (!task) {
        return next(new AppError("task not found :(", 404));
    }
    return res.status(200).json({ success: true, message: "task deleted successfully <3" });
})