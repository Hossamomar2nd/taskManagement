import userModel from "../../Database/models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "./catchError.js";
//////////////////////////////////////////////////////////////////

const checkEmail = catchError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) return next(new AppError("user already exist :(", 401))
    next()
})
//////////////////////////////////////////////////////////////////

export { checkEmail }