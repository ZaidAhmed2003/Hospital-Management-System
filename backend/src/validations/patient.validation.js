const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPatient = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().integer().min(0).max(120).required(),
    gender: Joi.string().valid('male', 'female', 'other', 'unknown').required(),
    address: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().required().email(),
    emergencyContact: Joi.string().optional(),
    disease: Joi.string().optional(),
    medicalHistory: Joi.string().optional(),
    doctor: Joi.string().required().custom(objectId),
  }),
};

const getPatients = {
  query: Joi.object().keys({
    name: Joi.string(),
    disease: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPatient = {
  params: Joi.object().keys({
    patientId: Joi.string().required().custom(objectId),
  }),
};

const updatePatient = {
  params: Joi.object().keys({
    patientId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      age: Joi.number().integer().min(0).max(120),
      gender: Joi.string().valid('male', 'female', 'other', 'unknown'),
      address: Joi.string(),
      phoneNumber: Joi.string(),
      email: Joi.string().email(),
      emergencyContact: Joi.string(),
      medicalHistory: Joi.string(),
      disease: Joi.string(),
      doctor: Joi.string().custom(objectId),
    })
    .min(1),
};

const deletePatient = {
  params: Joi.object().keys({
    patientId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
};
