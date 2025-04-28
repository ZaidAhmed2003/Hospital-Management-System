const Joi = require('joi');

const createLaboratory = Joi.object({
  testName: Joi.string().required(),
  description: Joi.string(),
  cost: Joi.number().positive().required(),
});

const updateLaboratory = Joi.object({
  testName: Joi.string(),
  description: Joi.string(),
  cost: Joi.number().positive(),
}).min(1);

module.exports = {
  createLaboratory,
  updateLaboratory,
};
