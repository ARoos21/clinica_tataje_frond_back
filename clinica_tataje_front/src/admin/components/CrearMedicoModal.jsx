import React, { useState, useEffect } from 'react';
import {
  crearMedico,
  actualizarMedico,
} from '../../services/medicoService';
import { obtenerEspecialidades } from '../../services/especialidadesServices';
import { obtenerPersonalClinico } from '../../services/personalClinico';

function MedicoModal({ onClose, onSuccess, modo = 'crear', medico = null }) {
  const [dniInput, setDniInput] = useState('');
  const [idPersonal, setIdPersonal] = useState(medico?.personalClinico?.id_personal || '');
  const [idEspecialidad, setIdEspecialidad] = useState(medico?.especialidad?.id_especialidad || '');
  const [especialidades, setEspecialidades] = useState([]);
  const [personales, setPersonales] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [espResponse, perResponse] = await Promise.all([
          obtenerEspecialidades(),
          obtenerPersonalClinico()
        ]);

        setEspecialidades(espResponse.data || []);
        const soloMedicos = (perResponse.data || []).filter(p => p.rol === 'medico');
        setPersonales(soloMedicos);
        setFiltrados(soloMedicos);
      } catch (err) {
        setEspecialidades([]);
        setPersonales([]);
        setFiltrados([]);
        setError('Error al cargar datos');
      }
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    if (dniInput.trim() === '') {
      setFiltrados(personales);
      setIdPersonal('');
    } else {
      const filtro = personales.filter(p =>
        p.dni.includes(dniInput.trim())
      );
      setFiltrados(filtro);
      if (filtro.length === 1) {
        setIdPersonal(filtro[0].id_personal);
      } else {
        setIdPersonal('');
      }
    }
  }, [dniInput, personales]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idEspecialidad || (modo === 'crear' && !idPersonal)) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      if (modo === 'crear') {
        await crearMedico({
          id_personal: Number(idPersonal),
          id_especialidad: Number(idEspecialidad),
        });
        setMensaje('Médico registrado exitosamente');
      } else {
        await actualizarMedico(medico.id_medico, {
          id_especialidad: Number(idEspecialidad),
        });
        setMensaje('Médico actualizado exitosamente');
      }
      setError('');
      onSuccess();
      onClose();
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al procesar la solicitud');
      }
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg rounded-4 border-0">
          <div
            className="modal-header text-white rounded-top-4"
            style={{ backgroundColor: '#1e3144' }}
          >
            <h4 className="modal-title">
              {modo === 'crear' ? 'Registrar Médico' : 'Editar Médico'}
            </h4>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {modo === 'crear' && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">Buscar por DNI:</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    value={dniInput}
                    onChange={(e) => setDniInput(e.target.value)}
                    placeholder="Ingrese DNI"
                  />
                  {dniInput.trim() !== '' && (
                    <ul
                      className="list-group mt-2 shadow-sm"
                      style={{ maxHeight: '150px', overflowY: 'auto' }}
                    >
                      {filtrados.length > 0 ? (
                        filtrados.map(p => (
                          <li
                            key={p.id_personal}
                            className={`list-group-item list-group-item-action ${idPersonal === p.id_personal ? 'active' : ''}`}
                            onClick={() => {
                              setDniInput(p.dni);
                              setIdPersonal(p.id_personal);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <span className="fw-bold">{p.dni}</span> - {p.nombres} {p.apellido_paterno}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-danger">No encontrado</li>
                      )}
                    </ul>
                  )}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label fw-semibold">Especialidad:</label>
                <select
                  className="form-select rounded-pill"
                  value={idEspecialidad}
                  onChange={(e) => setIdEspecialidad(e.target.value)}
                  required
                >
                  <option value="">Seleccione una especialidad</option>
                  {especialidades.map((esp) => (
                    <option key={esp.id_especialidad} value={esp.id_especialidad}>
                      {esp.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {error && <div className="alert alert-danger rounded-pill py-2 px-3">{error}</div>}
              {mensaje && <div className="alert alert-success rounded-pill py-2 px-3">{mensaje}</div>}
            </div>

            <div className="modal-footer d-flex justify-content-end gap-2 bg-light rounded-bottom-4">
              <button
                type="submit"
                className="btn rounded-pill px-4"
                style={{ backgroundColor: '#1e3144', color: 'white' }}
              >
                {modo === 'crear' ? 'Registrar' : 'Actualizar'}
              </button>
              <button
                type="button"
                className="btn btn-secondary rounded-pill px-4"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MedicoModal;
