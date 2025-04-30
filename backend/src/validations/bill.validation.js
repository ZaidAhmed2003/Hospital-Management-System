const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBill = Joi.object({
  patient: objectId().required(),
  inpatient: objectId(),
  outpatient: objectId(),
  laboratory: objectId(),
  billingDate: Joi.date(),
  items: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required(),
        amount: Joi.number().min(0).required(),
      })
    )
    .required(),
  totalAmount: Joi.number().min(0).required(),
  status: Joi.string().valid('Unpaid', 'Paid', 'Cancelled'),
  paymentMethod: Joi.string().valid('Cash', 'Card', 'Insurance', 'Online'),
});

const updateBill = createBill.fork(['patient', 'items', 'totalAmount'], (schema) => schema.optional());

module.exports = {
  createBill,
  updateBill,
};
