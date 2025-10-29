import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "consultas-medicas";

// Crear una nueva consulta médica
export const crearConsultaMedica = async (consultaData) => {
  try {
    const response = await axios.post(`${API_URL}`, consultaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
