import Joi from "joi";

const userRegistrationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.min': `name should have a minimum length of {#limit}`,
            'string.max': `name should have a max length of {#limit}`,
            'any.required': `name is a required field`
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': `email should be a valid email`,
            'any.required': `email is a required field`
        }),

    password: Joi.string()
        .min(6)
        .pattern(/[0-9]+/)
        .required()
        .messages({
            'string.pattern.base': `password has to include atleast one number`,
            'string.min': `password should be minimum 6 characters long`,
            'any.required': `password is a required field`
        }),

    moneyBalance: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
            'number.positive': `moneyBalance has to be possitive number`,
            'any.required': `moneyBalance is a required field`
        }),
});

const userLoginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': `email should be a valid email`,
            'any.required': `email is a required field`
        }),

    password: Joi.string()
        .min(6)
        .pattern(/[0-9]+/)
        .required()
        .messages({
            'string.pattern.base': `password has to include atleast one number`,
            'string.min': `password should be minimum 6 characters long`,
            'any.required': `password is a required field`
        }),
});

const userTokenRenewSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': `email should be a valid email`,
            'any.required': `email is a required field`
        }),
});

export { userRegistrationSchema, userLoginSchema, userTokenRenewSchema };