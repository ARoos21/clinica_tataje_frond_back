import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'pacientes';

// TOKEN opcional (si necesitas autenticación)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Crear un nuevo paciente
export const crearPaciente = async (paciente) => {
  const response = await axios.post(API_URL, paciente);
  return response.data;
};

// Obtener todos los pacientes (requiere roles específicos y JWT)
export const getPacientes = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

// Obtener un paciente por ID (requiere roles específicos y JWT)
export const getPacientePorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

// Actualizar celular y estado civil del paciente autenticado
export const actualizarCelularYEstadoCivil = async (datos) => {
  const response = await axios.patch(`${API_URL}/cell-estado`, datos, getAuthHeaders());
  return response.data;
};

export const misDatos = async (data)=> {
  const response = await axios.patch(`${API_URL}/misDatos`,data,getAuthHeaders())
  return response.data;
}

export const actualizarCredenciales = async (datos) => {
  const response = await axios.patch(`${API_URL}/cambio`, datos, getAuthHeaders());
  return response.data;
}

