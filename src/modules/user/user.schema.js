import Joi from "joi"
///////////////////////////////////////////////////////////////////////////


export const addUser = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirmPassword: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required()
}).required();

export const paramsIdval = Joi.object({
    id: Joi.string().hex().length(24).required(),
});

export const updateUser = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(2).max(20),
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    confirmPassword: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    role: Joi.string().valid("user", "admin")
});