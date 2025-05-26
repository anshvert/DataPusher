const Joi = require('joi');

const destinationSchema = Joi.object({
    account_id: Joi.string().required(),
    url: Joi.string().uri().required(),
    http_method: Joi.string().valid('GET', 'POST', 'PUT').required(),
    headers: Joi.object().required(),
});

module.exports = { destinationSchema };