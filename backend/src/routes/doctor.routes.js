const express = require('express');
const { createDoctor, getDoctors } = require('../controllers/doctor.controller');
const validate = require('../middlewares/validate');
const { createDoctorSchema } = require('../validations/doctor.validation');

const router = express.Router();

router.route('/doctors')
    .post(validate(createDoctorSchema), createDoctor)
    .get(getDoctors);

module.exports = router;
