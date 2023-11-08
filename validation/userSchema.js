import Joi from "joi";

const userRegistrationSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .pattern(/[0-9]+/)
        .required(),

    moneyBalance: Joi.number()
        .positive()
        .precision(2)
        .required(),
});

export { userRegistrationSchema };