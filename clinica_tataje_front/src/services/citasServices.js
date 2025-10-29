import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'citas';

// Obtener headers con token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* ========================= PACIENTE ========================= */

// Crear una cita desde el perfil del paciente (requiere token)
export const crearCitaPaciente = async (citaData) => {
  const response = await axios.post(`${API_URL}/paciente`, citaData, getAuthHeaders());
  return response.data;
};

// Obtener todas las citas del paciente autenticado (requiere token)
export const getCitasPaciente = async () => {
  const response = await axios.get(`${API_URL}/paciente`, getAuthHeaders());
  return response.data;
};

/* ========================= PERSONAL CLÍNICO ========================= */

// Crear una cita como personal clínico (ADMINISTRADOR, SUPERADMINISTRADOR o SECRETARIA)
export const crearCitaPersonal = async (citaData) => {
  const response = await axios.post(`${API_URL}/personal`, citaData, getAuthHeaders());
  return response.data;
};

// Buscar citas por ID de paciente (solo personal clínico autorizado)
export const buscarCitasPorPaciente = async (dto) => {
  const response = await axios.post(`${API_URL}/personal/paciente`, dto, getAuthHeaders());
  return response.data;
};

// Obtener todas las citas del sistema (solo personal autorizado)
export const getCitasPersonal = async () => {
  const response = await axios.get(`${API_URL}/personal`, getAuthHeaders());
  return response.data;
};

// Obtener detalles de una cita por su ID (requiere autorización del personal)
export const getCitaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

// Reprogramar una cita existente (rol médico, secretaria, admin o superadmin)
export const reprogramarCita = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data, getAuthHeaders());
  return response.data;
};

// Cambiar el estado de una cita (Ej. de PROGRAMADA a CANCELADA)
export const cambiarEstadoCita = async (id, estado) => {
  const response = await axios.patch(
    `${API_URL}/estado/${id}`,
    { estado },
    getAuthHeaders()
  );
  return response.data;
};

// Listar todas las citas canceladas (requiere autenticación del personal)
export const getCitasCanceladas = async () => {
  const response = await axios.get(`${API_URL}/personal/canceladas`, getAuthHeaders());
  return response.data;
};
