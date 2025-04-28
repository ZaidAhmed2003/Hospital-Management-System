const catchAsync = require('../utils/catchAsync');
const { doctorService } = require('../services');

const createDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.createDoctor(req.body);
  res.status(201).send(doctor);
});

const getDoctors = catchAsync(async (req, res) => {
  const result = await doctorService.queryDoctors(req.query);
  res.send(result);
});

const getDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.getDoctorById(req.params.id);
  res.send(doctor);
});

const updateDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.updateDoctorById(req.params.id, req.body);
  res.send(doctor);
});

const deleteDoctor = catchAsync(async (req, res) => {
  await doctorService.softDeleteDoctorById(req.params.id);
  res.status(204).send();
});

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
