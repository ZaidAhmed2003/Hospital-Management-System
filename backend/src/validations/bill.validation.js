const Joi = require('joi');
const { objectId } = require('./custom.validation');

const itemSchema = Joi.object({
  description: Joi.string().required(),
  amount: Joi.number().positive().required(),
});

const createBill = Joi.object({
  patient: objectId().required(),
  inpatient: objectId(),
  outpatient: objectId(),
  laboratory: objectId(),
  billingDate: Joi.date(),
  items: Joi.array().items(itemSchema).required(),
  totalAmount: Joi.number().positive().required(),
  status: Joi.string().valid('Unpaid', 'Paid', 'Cancelled'),
  paymentMethod: Joi.string().valid('Cash', 'Card', 'Insurance', 'Online'),
});

const updateBill = Joi.object({
  patient: objectId(),
  inpatient: objectId(),
  outpatient: objectId(),
  laboratory: objectId(),
  billingDate: Joi.date(),
  items: Joi.array().items(itemSchema),
  totalAmount: Joi.number().positive(),
  status: Joi.string().valid('Unpaid', 'Paid', 'Cancelled'),
  paymentMethod: Joi.string().valid('Cash', 'Card', 'Insurance', 'Online'),
}).min(1);

module.exports = {
  createBill,
  updateBill,
};
