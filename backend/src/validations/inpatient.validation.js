const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createInpatient = Joi.object({
  patient: objectId().required(),
  doctor: objectId().required(),
  room: objectId().required(),
  admissionDate: Joi.date(),
  dischargeDate: Joi.date().allow(null),
  diagnosis: Joi.string().required(),
  treatment: Joi.string().allow('', null),
  isDischarged: Joi.boolean(),
  totalBill: Joi.number().min(0),
  status: Joi.string().valid('Admitted', 'Under Treatment', 'Discharged'),
});

const updateInpatient = createInpatient.fork(['patient', 'doctor', 'room', 'diagnosis'], (schema) => schema.optional());

module.exports = {
  createInpatient,
  updateInpatient,
};
