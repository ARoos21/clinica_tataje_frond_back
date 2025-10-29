import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'historia-medica';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Historial del paciente autenticado
export const obtenerHistorialPaciente = async () => {
  const response = await axios.get(`${API_URL}/paciente`, getAuthHeaders());
  return response.data;
};

// Historial por ID (requiere rol secretaria/admin) - usando POST  
export const obtenerHistorialPorID = async (dtoBuscarCita) => {
  const response = await axios.post(`${API_URL}/buscar`, dtoBuscarCita, getAuthHeaders());
  return response.data;
};
