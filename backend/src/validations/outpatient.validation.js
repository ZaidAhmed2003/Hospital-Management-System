const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOutpatient = Joi.object({
  patient: objectId().required(),
  doctor: objectId().required(),
  visitDate: Joi.date().required(),
  diagnosis: Joi.string().required(),
  treatment: Joi.string(),
});

const updateOutpatient = Joi.object({
  patient: objectId(),
  doctor: objectId(),
  visitDate: Joi.date(),
  diagnosis: Joi.string(),
  treatment: Joi.string(),
}).min(1);

module.exports = {
  createOutpatient,
  updateOutpatient,
};
