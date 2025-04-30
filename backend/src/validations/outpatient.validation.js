const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOutpatient = Joi.object({
  patient: objectId().required(),
  doctor: objectId().required(),
  visitDate: Joi.date(),
  symptoms: Joi.string().required(),
  diagnosis: Joi.string().allow('', null),
  prescription: Joi.string().allow('', null),
  consultationFee: Joi.number().min(0).required(),
  status: Joi.string().valid('Consulted', 'Follow-up Needed', 'Referred'),
});

const updateOutpatient = createOutpatient.fork(['patient', 'doctor', 'symptoms', 'consultationFee'], schema => schema.optional());

module.exports = {
  createOutpatient,
  updateOutpatient,
};
