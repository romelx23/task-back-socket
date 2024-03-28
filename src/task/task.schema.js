const joi = require("joi");
const taskJoiSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    color: joi.string().required(),
    status: joi.boolean().required()
});

module.exports = taskJoiSchema;