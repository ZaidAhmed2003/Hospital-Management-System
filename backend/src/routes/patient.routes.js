const express = require('express');
const { createPatient, getPatients } = require('../controllers/patient.controller');
const validate = require('../middlewares/validate');
const { createPatientSchema } = require('../validations/patient.validation');

const router = express.Router();

router.route('/')
    .post(validate(createPatientSchema), createPatient)
    .get(getPatients);

module.exports = router;
