const Joi = require('joi');

const createPatient = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).max(120).required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  address: Joi.string().required(),
  email: Joi.string().email(),
  emergencyContact: Joi.string().pattern(/^[0-9]{10,15}$/),
});

const updatePatient = Joi.object({
  name: Joi.string(),
  age: Joi.number().integer().min(0).max(120),
  gender: Joi.string().valid('Male', 'Female', 'Other'),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/),
  address: Joi.string(),
  email: Joi.string().email(),
  emergencyContact: Joi.string().pattern(/^[0-9]{10,15}$/),
}).min(1);

module.exports = {
  createPatient,
  updatePatient,
};
