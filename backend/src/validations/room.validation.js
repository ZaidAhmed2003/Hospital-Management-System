const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRoom = Joi.object({
  roomNo: Joi.string().trim().uppercase().required(),
  roomType: Joi.string().valid('General', 'Semi-Private', 'Private', 'ICU').required(),
  status: Joi.string().valid('Available', 'Occupied', 'Maintenance'),
  roomCharge: Joi.number().min(0).required(),
});

const getRooms = {
  query: Joi.object().keys({
    roomNo: Joi.string(),
    roomType: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().required().custom(objectId),
  }),
};

const updateRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      roomNo: Joi.string().trim().uppercase(),
      roomType: Joi.string().valid('General', 'Semi-Private', 'Private', 'ICU'),
      status: Joi.string().valid('Available', 'Occupied', 'Maintenance'),
      roomCharge: Joi.number().min(0),
    })
    .min(1),
};

const deleteRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
