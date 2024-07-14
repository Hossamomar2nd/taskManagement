import Joi from "joi";
//////////////////////////////////////////////////////////////////////

export const register = Joi.object({
    name: Joi.string().min(2).max(20).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required()
}).required();


export const logIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required()
}).required()

export const changePassword = Joi.object({
    id: Joi.string().hex().length(24).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    newPassword: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
})