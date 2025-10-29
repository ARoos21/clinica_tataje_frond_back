import React, { useState, useEffect } from 'react';
import {
  crearEspecialidad,
  actualizarEspecialidad,
  obtenerEspecialidadPorId
} from '../../services/especialidadesServices';

function CrearEspecialidadModal({ onClose, onSuccess, modo = 'crear', especialidadId = null }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenFile, setImagenFile] = useState(null);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (modo === 'editar' && especialidadId) {
      obtenerEspecialidadPorId(especialidadId)
        .then((data) => {
          const esp = data.data;
          setNombre(esp.nombre);
          setDescripcion(esp.descripcion);
        })
        .catch((err) => console.error('Error al cargar especialidad', err));
    }
  }, [modo, especialidadId]);

  const handleFileChange = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !descripcion.trim() || (modo === 'crear' && !imagenFile)) {
      setError('Todos los campos son obligatorios');
      setMensaje('');
      return;
    }

    try {
      if (modo === 'crear') {
        await crearEspecialidad({ nombre, descripcion }, imagenFile);
        setMensaje('✅ Especialidad registrada con éxito');
      } else {
        await actualizarEspecialidad(especialidadId, { nombre, descripcion }, imagenFile);
        setMensaje('✅ Especialidad actualizada con éxito');
      }

      setError('');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1000);
    } catch (err) {
      console.error(err);
      setMensaje('');
      setError('❌ Error al procesar la solicitud');
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div
            className="modal-header text-white"
            style={{ backgroundColor: '#1e3144', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
          >
            <h5 className="modal-title">
              {modo === 'crear' ? 'Registrar' : 'Editar'} Especialidad
            </h5>
            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body bg-light rounded-bottom p-4">
              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre:</label>
                <input
                  type="text"
                  className="form-control rounded-3 shadow-sm"
                  placeholder="Ej. Pediatría"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Descripción:</label>
                <textarea
                  className="form-control rounded-3 shadow-sm"
                  placeholder="Ej. Atención médica especializada para niños"
                  rows="3"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  {modo === 'editar' ? 'Nueva Imagen (opcional):' : 'Imagen:'}
                </label>
                <input
                  type="file"
                  className="form-control rounded-3 shadow-sm"
                  accept="image/*"
                  onChange={handleFileChange}
                  required={modo === 'crear'}
                />
              </div>

              {error && <div className="alert alert-danger fw-medium">{error}</div>}
              {mensaje && <div className="alert alert-success fw-medium">{mensaje}</div>}
            </div>

            <div className="modal-footer bg-white rounded-bottom border-top-0 d-flex justify-content-end gap-2 px-4 pb-4">
              <button type="submit" className="btn btn-success px-4 shadow-sm rounded-pill">
                {modo === 'crear' ? 'Registrar' : 'Actualizar'}
              </button>
              <button type="button" className="btn btn-secondary px-4 rounded-pill" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearEspecialidadModal;
