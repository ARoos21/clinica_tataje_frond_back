import axios from 'axios';

// Toma la URL base del backend (desde tu .env)
const API_URL = import.meta.env.VITE_API_URL + 'auth';

// Iniciar sesión como personal clínico
export const loginPersonalClinico = async (credenciales) => {
  const { data } = await axios.post(`${API_URL}/login/personal-clinico`, credenciales);
  return data;
};

// Iniciar sesión como paciente
export const loginPaciente = async (credenciales) => {
  const response = await axios.post(`${API_URL}/login/paciente`, credenciales);
  // Si el backend usa ResponseFormatInterceptor, el token real viene dentro de .data.data
  return response?.data?.data ?? response?.data;
};
