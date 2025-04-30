const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { doctorService } = require('../services');

const createDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.createDoctor(req.body);
  res.status(httpStatus.CREATED).send(doctor);
});

const getDoctors = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await doctorService.queryDoctors(filter, options);
  res.send(result);
});

const getDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.getDoctorById(req.params.doctorId);
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  }
  res.send(doctor);
});

const updateDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.updateDoctorById(req.params.doctorId, req.body);
  res.send(doctor);
});

const deleteDoctor = catchAsync(async (req, res) => {
  await doctorService.deleteDoctorById(req.params.doctorId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
