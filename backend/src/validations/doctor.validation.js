const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDoctor = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().integer().min(25).max(80).optional(),
    email: Joi.string().required().email(),
    gender: Joi.string().valid('male', 'female', 'other', 'unknown').optional(),
    specialty: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().optional(),
  }),
};

const getDoctors = {
  query: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    speciality: Joi.string().optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDoctor = {
  params: Joi.object().keys({
    doctorId: Joi.string().custom(objectId),
  }),
};

const updateDoctor = {
  params: Joi.object().keys({
    doctorId: Joi.string().custom(objectId), // Changed Joi.required() to Joi.string()
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      age: Joi.number().integer().min(0).max(80),
      gender: Joi.string(),
      email: Joi.string().email(),
      specialty: Joi.string().optional(),
      phoneNumber: Joi.string().optional(),
      address: Joi.string().optional(),
    })
    .min(1),
};

const deleteDoctor = {
  params: Joi.object().keys({
    doctorId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
