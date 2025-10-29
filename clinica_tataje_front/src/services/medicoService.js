import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'medicos';

// Obtener headers con token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Crear médico (requiere SUPERADMINISTRADOR o ADMINISTRADOR)
export const crearMedico = async (medicoData) => {
  const response = await axios.post(API_URL, medicoData, getAuthHeaders());
  return response.data;
};

// Actualizar médico (requiere SUPERADMINISTRADOR o ADMINISTRADOR)
export const actualizarMedico = async (id, medicoData) => {
  const response = await axios.patch(`${API_URL}/${id}`, medicoData, getAuthHeaders());
  return response.data;
};

// Obtener un médico por ID (sin auth)
export const obtenerMedicoPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Obtener todos los médicos (sin auth)
export const obtenerMedicos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Eliminar médico (requiere SUPERADMINISTRADOR o ADMINISTRADOR)
export const eliminarMedico = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
