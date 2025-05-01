// src/constants/api.js
import axios from './../utils/axios';

export const login = (data) => axios.post('/auth/login', data);
export const getDoctors = (limit = 10, page = 1) => 
  axios.get(`/v1/doctors`, { params: { limit, page } });
export const deleteDoctor = (doctorId) => 
  axios.delete(`/v1/doctors/${doctorId}`); // ✅ Add this line

export const getPatients = () => axios.get('/patients');
export const getRooms = () => axios.get('/rooms');
