import React, { useEffect, useState } from 'react';
import { getDecodedToken } from '../utils/tokenUtils';
import { obtenerPersonalPorId } from '../services/personalClinico';
import ModalCambiarCredenciales from './components/ModalCambiarCredenciales';

function MiCuenta() {
  const [usuario, setUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const datosToken = getDecodedToken();

    if (datosToken?.rol !== 'paciente') {
      obtenerPersonalPorId(datosToken.id)
        .then(response => setUsuario(response.data))
        .catch(error => {
          console.error('Error al obtener información del personal:', error);
        });
    }
  }, []);

  return (
    <div className="container m-auto d-flex justify-content-center">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h3 className="mb-4 text-center" style={{ color: '#1e3144' }}>
          Mi Cuenta
        </h3>
        {usuario ? (
          <>
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label text-muted">DNI</label>
                <div className="form-control bg-light">{usuario.dni}</div>
              </div>
              <div className="col-12 mb-3">
                <label className="form-label text-muted">Nombres</label>
                <div className="form-control bg-light">{usuario.nombres}</div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted">Apellido Paterno</label>
                <div className="form-control bg-light">{usuario.apellido_paterno}</div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted">Apellido Materno</label>
                <div className="form-control bg-light">{usuario.apellido_materno}</div>
              </div>
              <div className="col-12 mb-3">
                <label className="form-label text-muted">Correo Electrónico</label>
                <div className="form-control bg-light">{usuario.email}</div>
              </div>
              <div className="col-12 mb-3">
                <label className="form-label text-muted">Rol</label>
                <div className="form-control bg-light">
                  <span
                    className="badge px-3 py-2 fs-6 rounded-pill shadow-sm"
                    style={{ backgroundColor: '#1e3144', color: 'white' }}
                  >
                    {usuario.rol.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                className="btn"
                onClick={() => setShowModal(true)}
                style={{
                  border: '2px solid #1e3144',
                  color: '#1e3144',
                  fontWeight: '500',
                }}
              >
                Cambiar Credenciales
              </button>
            </div>

            <ModalCambiarCredenciales
              show={showModal}
              handleClose={() => setShowModal(false)}
              emailActual={usuario.email}
            />
          </>
        ) : (
          <div className="alert alert-warning text-center">
            No se encontró información del usuario.
          </div>
        )}
      </div>
    </div>
  );
}

export default MiCuenta;
