const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createInpatient = Joi.object({
  patient: objectId().required(),
  doctor: objectId().required(),
  room: objectId().required(),
  admissionDate: Joi.date().required(),
  dischargeDate: Joi.date().optional(),
  diagnosis: Joi.string().required(),
  treatment: Joi.string(),
});

const updateInpatient = Joi.object({
  patient: objectId(),
  doctor: objectId(),
  room: objectId(),
  admissionDate: Joi.date(),
  dischargeDate: Joi.date(),
  diagnosis: Joi.string(),
  treatment: Joi.string(),
}).min(1);

module.exports = {
  createInpatient,
  updateInpatient,
};
