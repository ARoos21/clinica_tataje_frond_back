import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'especialidades';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Crear especialidad con imagen (requiere roles admin)
export const crearEspecialidad = async (data, file) => {
  const formData = new FormData();
  formData.append('nombre', data.nombre);
  formData.append('descripcion', data.descripcion);
  if (file) {
    formData.append('imagen', file);
  }

  const response = await axios.post(API_URL, formData, {
    ...getAuthHeaders(),
    headers: {
      ...getAuthHeaders().headers,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Actualizar especialidad (con o sin imagen)
export const actualizarEspecialidad = async (id, data, file) => {
  const formData = new FormData();
  if (data.nombre) formData.append('nombre', data.nombre);
  if (data.descripcion) formData.append('descripcion', data.descripcion);
  if (file) formData.append('imagen', file);

  const response = await axios.patch(`${API_URL}/${id}`, formData, {
    ...getAuthHeaders(),
    headers: {
      ...getAuthHeaders().headers,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Obtener todas las especialidades (público)
export const obtenerEspecialidades = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener una especialidad por ID
export const obtenerEspecialidadPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Eliminar especialidad (requiere roles admin)
export const eliminarEspecialidad = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
