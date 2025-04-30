const httpStatus = require('http-status');
const { Doctor } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a doctor
 * @param {Object} doctorBody
 * @returns {Promise<Doctor>}
 */
const createDoctor = async (doctorBody) => {
  if (await Doctor.isEmailTaken(doctorBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Doctor.create(doctorBody);
};

/**
 * Query for docters
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDoctors = async (filter, options) => {
  const docters = await Doctor.paginate(filter, options);
  return docters;
};

/**
 * Get docter by id
 * @param {ObjectId} id
 * @returns {Promise<Doctor>}
 */
const getDoctorById = async (id) => {
  return Doctor.findById(id);
};

/**
 * Get doctor by email
 * @param {string} email
 * @returns {Promise<Doctor>}
 */
const getDoctorByEmail = async (email) => {
  return Doctor.findOne({ email });
};

/**
 * Update doctor by id
 * @param {ObjectId} doctorId
 * @param {Object} updateBody
 * @returns {Promise<Doctor>}
 */
const updateDoctorById = async (doctorId, updateBody) => {
  const doctor = await getDocterById(doctorId);
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  }
  if (updateBody.email && (await Doctor.isEmailTaken(updateBody.email, doctorId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(doctor, updateBody);
  await doctor.save();
  return doctor;
};

/**
 * Delete doctor by id
 * @param {ObjectId} doctorId
 * @returns {Promise<Doctor>}
 */
const deleteDoctorById = async (doctorId) => {
  const doctor = await getDocterById(doctorId);
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  }
  await doctor.remove();
  return doctor;
};

module.exports = {
  createDoctor,
  queryDoctors,
  getDoctorById,
  getDoctorByEmail,
  updateDoctorById,
  deleteDoctorById,
};
