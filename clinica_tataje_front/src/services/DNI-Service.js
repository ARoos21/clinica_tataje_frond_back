import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'reniec';

/**
 * Consulta datos personales desde API externa RENIEC
 * @param {string} documentNumber - Número de documento (DNI)
 * @returns {Promise<Object>} Datos personales del ciudadano
 */
export const consultarDatosPorDni = async (documentNumber) => {
  const payload = { document_number: documentNumber };
  const response = await axios.post(`${API_URL}/consulta-dni`, payload);
  return response.data;
};
