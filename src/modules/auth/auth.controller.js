import userModel from "../../../Database/models/user.model.js";
import { catchError } from "../../midlleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
///////////////////////////////////////////////////////////////////////

export const register = catchError(async (req, res, next) => {
    let user = new userModel(req.body);
    await user.save();
    res.status(201).json({ success: true, message: "created successfully", user });
});

export const logIn = catchError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return next(new AppError("email not correct", 401));
    const compare = bcryptjs.compareSync(req.body.password, user.password)
    if (compare) {
        let token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY);
        return res.status(201).json({ message: "success", token });
    } else {
        next(new AppError("invalid email or password", 401));
    }
});

export const changePassword = catchError(async (req, res, next) => {
    let user = await userModel.findById(req.params.id);
    let compare = bcryptjs.compareSync(req.body.password, user.password);
    if (user && compare) {
        let token = jwt.sign({ _id: user.id, role: user.role }, process.env.SECRET_KEY);
        userModel.findByIdAndUpdate(req.params.id, { password: req.body.newPassword });
        return res.status(201).json({ message: "success", token });
    } else {
        return next(new AppError("Invalid Email or Password :(", 401));
    }
});

export const protectedroutes = catchError(async (req, res, next) => {
    let token = req.headers.token
    //1-check token
    if (!token) return next(new AppError("please login first", 401))
    //2-verify token
    let decoded = jwt.verify(token, process.env.SECRET_KEY);

    //3-check user
    let user = await userModel.findById(decoded._id)
    if (!user) return next(new AppError("user not found", 401))
    if (user.passwordChangedAt) {
        let time = parseInt(user?.passwordChangedAt.getTime() / 1000)
        if (time > decoded.iat) return next(new AppError("invalid token ", 401))
    }
    req.user = user
    next()
})

export const allowedTo = (...roles) => {
    return catchError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            next(new AppError("you are not allowed to do that", 401))
        }
        next()
    })
}
