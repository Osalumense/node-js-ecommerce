const joi = require("joi");

const validateSellRequest = data => {
    const schema = joi.object({
        name: joi.string()
            .required(),
        email: joi.string()
            .email()
            .required(),
        whatsAppContact: joi.string()
            .required(),
        address: joi.string()
            .required(),
        preferredDevice: joi.string()
            .allow('')
            .when( 'isSale', { is: '', then: joi.string().required() })
            .label("Preferred device cannot be empty when you want to swap device."),
        isSwap: joi.boolean()
            .allow(''),
        isSale: joi.boolean()
            .allow(''),
        amount: joi.number()
            .required(),
        extraNotes: joi.string(),
        category: joi.string()
            .required(),
        deviceName: joi.string()
            .required()
    }).or( 'isSwap', 'isSale', 'preferredDevice' );
    return schema.validate(data, {
        abortEarly: false
    });
};

const validateOrderRequest = data => {
    const schema = joi.object({
        allProduct: joi.alternatives().try(joi.object(), joi.array())
            .required(),
        user: joi.string()
            .required(),
        amount: joi.number()
            .required(),
        transactionId: joi.required(),
        address: joi.string(),
        phone: joi.number()
    });
    return schema.validate(data, {
        abortEarly: false
    });
};

module.exports = {
    validateSellRequest,
    validateOrderRequest
}