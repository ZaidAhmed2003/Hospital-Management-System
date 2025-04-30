const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLab = Joi.object({
  labNo: Joi.string().trim().uppercase().required(),
  patient: objectId().required(),
  doctor: objectId().required(),
  date: Joi.date(),
  tests: Joi.array()
    .items(
      Joi.object({
        testName: Joi.string().required(),
        result: Joi.string().allow('', null),
        normalRange: Joi.string().allow('', null),
      })
    )
    .required(),
  totalAmount: Joi.number().min(0).required(),
  status: Joi.string().valid('Pending', 'Completed', 'Cancelled'),
});

const updateLab = createLab.fork(['labNo', 'patient', 'doctor', 'tests', 'totalAmount'], (schema) => schema.optional());

module.exports = {
  createLab,
  updateLab,
};
