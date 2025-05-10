const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createInpatient = {
  body: Joi.object().keys({
    patient: Joi.string().custom(objectId).required(),
    doctor: Joi.string().custom(objectId).required(),
    room: Joi.string().custom(objectId).required(),
    admissionDate: Joi.date(),
    dischargeDate: Joi.date().allow(null),
    diagnosis: Joi.string().required(),
    treatment: Joi.string().allow('', null),
    isDischarged: Joi.boolean(),
    totalBill: Joi.number().min(0),
    status: Joi.string().valid('Admitted', 'Under Treatment', 'Discharged'),
  }),
};

const getInpatients = {
  query: Joi.object().keys({
    patient: Joi.string().custom(objectId),
    doctor: Joi.string().custom(objectId),
    room: Joi.string().custom(objectId),
    status: Joi.string().valid('Admitted', 'Under Treatment', 'Discharged'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getInpatient = {
  params: Joi.object().keys({
    inpatientId: Joi.string().custom(objectId),
  }),
};

const updateInpatient = {
  params: Joi.object().keys({
    inpatientId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      patient: Joi.string().custom(objectId),
      doctor: Joi.string().custom(objectId),
      room: Joi.string().custom(objectId),
      admissionDate: Joi.date(),
      dischargeDate: Joi.date().allow(null),
      diagnosis: Joi.string(),
      treatment: Joi.string().allow('', null),
      isDischarged: Joi.boolean(),
      totalBill: Joi.number().min(0),
      status: Joi.string().valid('Admitted', 'Under Treatment', 'Discharged'),
    })
    .min(1),
};

const deleteInpatient = {
  params: Joi.object().keys({
    inpatientId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createInpatient,
  getInpatients,
  getInpatient,
  updateInpatient,
  deleteInpatient,
};
