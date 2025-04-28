const Joi = require('joi');

const createRoom = Joi.object({
  roomNumber: Joi.string().required(),
  roomType: Joi.string().valid('General', 'Semi-Private', 'Private', 'ICU').required(),
  isAvailable: Joi.boolean(),
  ratePerDay: Joi.number().positive().required(),
});

const updateRoom = Joi.object({
  roomNumber: Joi.string(),
  roomType: Joi.string().valid('General', 'Semi-Private', 'Private', 'ICU'),
  isAvailable: Joi.boolean(),
  ratePerDay: Joi.number().positive(),
}).min(1);

module.exports = {
  createRoom,
  updateRoom,
};
