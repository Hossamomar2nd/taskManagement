import userModel from "../../../Database/models/user.model.js";
import { catchError } from "../../midlleware/catchError.js";
import { ApiFeature } from "../../utils/apifeature.js"
import { AppError } from "../../utils/AppError.js";

export const addUser = catchError(async (req, res, next) => {
    let user = new userModel(req.body);
    await user.save();
    return res.status(201).json({ success: true, message: user });
});

export const getAllUsers = catchError(async (req, res, next) => {
    let ApiFeatures = new ApiFeature(userModel.find(), req.query).filter().search().pagination().sort();
    let users = await ApiFeatures.mongooseQuery
    res.status(200).json({ success: true, page: ApiFeatures.pageNumber, message: users });
});

export const getUser = catchError(async (req, res, next) => {
    let user = await userModel.findById(req.params.id);
    console.log(user);
    if (!user) {
        return next(new AppError("user not found", 404));
    }
    return res.status(200).json({ success: true, message: user });
});

export const updateUser = catchError(async (req, res, next) => {
    let user = await userModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!user) {
        return next(new AppError("user not found", 404));
    }
    return res.status(201).json({ success: true, message: "user updated successfully", user });

});

export const deleteUser = catchError(async (req, res, next) => {
    let user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new AppError("user not found :(", 404));
    }

    return res.status(200).json({ success: true, message: "user deleted successfully", });
})