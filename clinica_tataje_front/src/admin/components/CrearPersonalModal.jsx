import React, { useState } from 'react';
import { consultarDatosPorDni } from '../../services/DNI-Service';
import { crearPersonalClinico } from '../../services/personalClinico';

function CrearPersonalModal({ onClose, onSuccess }) {
  const [dni, setDni] = useState('');
  const [datosReniec, setDatosReniec] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const buscarDni = async () => {
    if (dni.length !== 8) {
      setError('El DNI debe tener 8 dígitos');
      return;
    }

    try {
      const response = await consultarDatosPorDni(dni);
      setDatosReniec(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('No se encontraron datos para el DNI ingresado');
      setDatosReniec(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!datosReniec || !rol) {
      setError('Debes completar todos los campos obligatorios');
      return;
    }

    const nuevoPersonal = {
      ...datosReniec,
      email,
      password,
      rol,
    };

    try {
      await crearPersonalClinico(nuevoPersonal);
      setMensaje('Personal registrado correctamente');
      setError('');
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Error al registrar personal');
    }
  };

  return (
    <div className="modal show fade d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registrar Personal Clínico</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label">DNI:</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={dni}
                  maxLength={8}
                  onChange={(e) => setDni(e.target.value)}
                />
              </div>
              <div className="col-sm-3">
                <button type="button" className="btn btn-primary" onClick={buscarDni}>Buscar</button>
              </div>
            </div>
            {error && !datosReniec && <div className="alert alert-danger py-1">{error}</div>}
            {datosReniec && (
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input type="text" className="form-control mb-2" value={datosReniec.nombres} readOnly placeholder="Nombres" />
                  <input type="text" className="form-control mb-2" value={datosReniec.apellido_paterno} readOnly placeholder="Apellido Paterno" />
                  <input type="text" className="form-control mb-2" value={datosReniec.apellido_materno} readOnly placeholder="Apellido Materno" />
                  <input type="date" className="form-control mb-2" value={datosReniec.fecha_nacimiento} readOnly placeholder="Fecha de nacimiento" />

                  <input type="hidden" name="estado_civil" value={datosReniec.estado_civil || ''} />
                  <input type="hidden" name="genero" value={datosReniec.genero || ''} />
                  <input type="hidden" name="ubigeo" value={datosReniec.ubigeo || ''} />
                  <input type="hidden" name="direccion" value={datosReniec.direccion || ''} />
                </div>
                <div className="mb-2">
                  <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <select
                    className="form-select mb-2"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    required
                  >
                    <option value="">-- Selecciona un rol --</option>
                    <option value="superadministrador">Superadministrador</option>
                    <option value="administrador">Administrador</option>
                    <option value="secretaria">Secretaria</option>
                    <option value="medico">Médico</option>
                  </select>
                </div>
                {error && <div className="alert alert-danger py-1">{error}</div>}
                {mensaje && <div className="alert alert-success py-1">{mensaje}</div>}
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Registrar</button>
                  <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearPersonalModal;
