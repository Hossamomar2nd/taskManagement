import Joi from "joi";

export const addTask = Joi.object({
    title: Joi.string().trim().min(2).max(20).required(),
    type: Joi.string().required(),
    body: Joi.string(),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpg", "image/jpeg").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required().max(10000000)
    }),
    shared: Joi.boolean().required(),
    categoryId: Joi.string().hex().length(24).required()
})

export const paramsIdval = Joi.object({
    id: Joi.string().required().hex().length(24).required()

})

export const updateTask = Joi.object({
    id: Joi.string().required().hex().length(24).required(),
    title: Joi.string().trim().min(2).max(20),
    type: Joi.string(),
    body: Joi.string(),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpg", "image/jpeg").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required().max(10000000)
    }),
    shared: Joi.boolean()
})


