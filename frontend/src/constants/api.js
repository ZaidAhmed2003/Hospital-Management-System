// src/constants/api.js
import axios from "./../utils/axios";

export const login = (data) => axios.post("v1/auth/login", data);
export const logout = () => axios.post("/auth/logout");
export const refreshToken = () => axios.post("/auth/refresh-tokens");

export const getDoctors = (limit = 10, page = 1) =>
  axios.get(`/v1/doctors`, { params: { limit, page } });

export const deleteDoctor = (doctorId) =>
  axios.delete(`/v1/doctors/${doctorId}`);

export const getPatients = () => axios.get("/patients");
export const getRooms = () => axios.get("/rooms");
