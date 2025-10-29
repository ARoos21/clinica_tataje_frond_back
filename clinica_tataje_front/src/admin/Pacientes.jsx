import React, { useEffect, useState } from 'react';
import { getPacientes } from '../services/pacientes';
import CrearPacienteModal from './components/CrearPacienteModal';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarPacientes = () => {
    getPacientes()
      .then(({ data }) => setPacientes(data))
      .catch((error) => console.error('Error al obtener pacientes:', error));
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  return (
    <div className="container py-4">
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{ backgroundColor: '#fdfdfd' }}
      >
        <div className="card-body px-4 py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
            <h3 className="fw-bold m-0 text-dark" style={{ color: '#1e3144' }}>
              <i className="bi bi-person-lines-fill me-2"></i>
              Pacientes Registrados
            </h3>
            <button
              className="btn"
              onClick={() => setMostrarModal(true)}
              style={{
                backgroundColor: '#1e3144',
                color: '#fff',
                fontWeight: 'bold',
                padding: '0.5rem 1.2rem',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
              }}
            >
              <i className="bi bi-person-plus-fill me-1"></i> Registrar Paciente
            </button>
          </div>

          <div
            className="table-responsive rounded-3 overflow-auto"
            style={{ maxHeight: '450px' }}
          >
            <table className="table table-hover align-middle text-center mb-0">
              <thead
                className="text-white"
                style={{
                  backgroundColor: '#1e3144',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                }}
              >
                <tr>
                  <th>#</th>
                  <th>DNI</th>
                  <th className="text-start">Nombres</th>
                  <th>Apellido Paterno</th>
                  <th>Apellido Materno</th>
                  <th className="text-start">Dirección</th>
                  <th>Teléfono</th>
                  <th>Edad</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted fst-italic">
                      No hay pacientes registrados.
                    </td>
                  </tr>
                ) : (
                  pacientes.map((paciente, i) => (
                    <tr key={paciente.id_paciente}>
                      <td>{i + 1}</td>
                      <td>{paciente.dni}</td>
                      <td className="text-start">{paciente.nombres}</td>
                      <td>{paciente.apellido_paterno}</td>
                      <td>{paciente.apellido_materno}</td>
                      <td className="text-start">{paciente.direccion}</td>
                      <td>{paciente.telefono}</td>
                      <td>{calcularEdad(paciente.fecha_nacimiento)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {mostrarModal && (
        <CrearPacienteModal
          onClose={() => setMostrarModal(false)}
          onSuccess={cargarPacientes}
        />
      )}
    </div>
  );
}

export default Pacientes;
