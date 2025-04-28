const Joi = require('joi');

const objectId = () =>
  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('"{{#label}}" must be a valid mongo id');

module.exports = {
  objectId,
};
