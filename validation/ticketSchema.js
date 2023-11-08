import Joi from "joi";

const ticketAddSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.min': `title should have a minimum length of {#limit}`,
            'string.max': `title should have a max length of {#limit}`,
            'any.required': `title is a required field`
        }),

    departureLocation: Joi.string()
        .required()
        .messages({
            'any.required': `departureLocation is a required field`
        }),

    destination: Joi.string()
        .required()
        .messages({
            'any.required': `destination is a required field`
        }),

    price: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
            'number.positive': `price has to be possitive number`,
            'any.required': `price is a required field`
        }),

    destinationPhotoUrl: Joi.string()
        .pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)$/i)
        .required()
        .messages({
            'string.pattern.base': `destinationPhotoUrl has to be an immage url`,
            'any.required': `destinationPhotoUrl is a required field`
        }),
});

export { ticketAddSchema };