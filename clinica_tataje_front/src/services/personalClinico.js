import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'personalClinico';

// Obtener token desde localStorage (puedes adaptarlo si usas Zustand)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

//  Crear personal clínico (requiere rol ADMINISTRADOR o SUPERADMINISTRADOR)
export const crearPersonalClinico = async (data) => {
  const response = await axios.post(API_URL, data, getAuthHeaders());
  return response.data;
};

// Cambiar credenciales (requiere estar logueado como médico, secretaria, administrador o superadministrador)
export const cambiarCredenciales = async (data) => {
  const response = await axios.patch(`${API_URL}/credenciales`, data, getAuthHeaders());
  return response.data;
};

// Obtener todos los personales clínicos (solo ADMINISTRADOR o SUPERADMINISTRADOR)
export const obtenerPersonalClinico = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

// Obtener un personal clínico por ID
export const obtenerPersonalPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
