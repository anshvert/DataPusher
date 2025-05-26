const Joi = require('joi');

const accountSchema = Joi.object({
    email: Joi.string().email().required(),
    account_name: Joi.string().required(),
    website: Joi.string().uri().allow(null),
});

module.exports = { accountSchema };