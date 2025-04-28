const { Doctor } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');

const createDoctor = async (doctorBody) => {
  return Doctor.create(doctorBody);
};

const queryDoctors = async (query) => {
  const { skip, limit } = paginate(query, query);
  const doctors = await Doctor.find({ isDeleted: false })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  return doctors;
};

const getDoctorById = async (id) => {
  const doctor = await Doctor.findOne({ _id: id, isDeleted: false });
  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }
  return doctor;
};

const updateDoctorById = async (doctorId, updateBody) => {
  const doctor = await getDoctorById(doctorId);
  Object.assign(doctor, updateBody);
  await doctor.save();
  return doctor;
};

const softDeleteDoctorById = async (doctorId) => {
  const doctor = await getDoctorById(doctorId);
  doctor.isDeleted = true;
  await doctor.save();
};

module.exports = {
  createDoctor,
  queryDoctors,
  getDoctorById,
  updateDoctorById,
  softDeleteDoctorById,
};
