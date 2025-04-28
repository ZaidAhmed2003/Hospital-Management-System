const Joi = require('joi');

const createDoctor = Joi.object({
  name: Joi.string().required(),
  specialization: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  email: Joi.string().email().required(),
  available: Joi.boolean(),
});

const updateDoctor = Joi.object({
  name: Joi.string(),
  specialization: Joi.string(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/),
  email: Joi.string().email(),
  available: Joi.boolean(),
}).min(1);

module.exports = {
  createDoctor,
  updateDoctor,
};
