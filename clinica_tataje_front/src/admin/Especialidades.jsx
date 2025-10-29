import { useEffect, useState } from 'react';
import {
  obtenerEspecialidades,
  eliminarEspecialidad
} from '../services/especialidadesServices.js';
import CrearEspecialidadModal from './components/CrearEspecialidadModal.jsx';
import Swal from 'sweetalert2';

function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modo, setModo] = useState('crear');
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);

  const cargarEspecialidades = () => {
    obtenerEspecialidades()
      .then(({ data }) => setEspecialidades(data))
      .catch(e => console.error('Error al obtener especialidades:', e));
  };

  useEffect(() => {
    cargarEspecialidades();
  }, []);

  const abrirCrear = () => {
    setModo('crear');
    setEspecialidadSeleccionada(null);
    setMostrarModal(true);
  };

  const abrirEditar = (id) => {
    setModo('editar');
    setEspecialidadSeleccionada(id);
    setMostrarModal(true);
  };

  const handleEliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Eliminar especialidad?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmacion.isConfirmed) {
      try {
        await eliminarEspecialidad(id);
        cargarEspecialidades();

        Swal.fire({
          title: 'Eliminado',
          text: 'La especialidad ha sido eliminada correctamente.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      } catch (err) {
        console.error('Error al eliminar especialidad:', err);
        Swal.fire('Error', 'No se pudo eliminar la especialidad.', 'error');
      }
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="card border-0 shadow-lg rounded-4 w-100">
        <div
          className="card-header d-flex justify-content-between align-items-center text-white"
          style={{
            backgroundColor: '#1e3144',
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem',
            padding: '1.25rem 2rem'
          }}
        >
          <h4 className="mb-0 fw-semibold">Especialidades Registradas</h4>
          <button
            className="btn btn-light fw-semibold px-4 py-2 rounded-pill shadow-sm"
            onClick={abrirCrear}
          >
            + Registrar
          </button>
        </div>

        <div className="card-body bg-light rounded-bottom p-4">
          {especialidades.length === 0 ? (
            <div className="alert alert-info text-center">
              No hay especialidades registradas.
            </div>
          ) : (
            <table
              className="table table-hover align-middle mb-0 text-center"
              style={{ width: '100%' }}
            >
              <thead
                style={{ backgroundColor: '#1e3144', color: '#fff' }}
              >
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th style={{ width: '20%' }}>Nombre</th>
                  <th style={{ width: '40%' }}>Descripción</th>
                  <th style={{ width: '20%' }}>Imagen</th>
                  <th style={{ width: '15%' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {especialidades.map((esp, i) => (
                  <tr key={esp.id_especialidad} className="bg-white">
                    <td>{i + 1}</td>
                    <td className="text-start fw-medium">{esp.nombre}</td>
                    <td className="text-start text-muted">{esp.descripcion}</td>
                    <td>
                      <img
                        src={`data:image/jpeg;base64,${esp.imagen}`}
                        alt={esp.nombre}
                        className="rounded"
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          border: '2px solid #ddd'
                        }}
                      />
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-warning px-3 rounded-pill"
                          onClick={() => abrirEditar(esp.id_especialidad)}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger px-3 rounded-pill"
                          onClick={() => handleEliminar(esp.id_especialidad)}
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {mostrarModal && (
        <CrearEspecialidadModal
          modo={modo}
          especialidadId={especialidadSeleccionada}
          onClose={() => setMostrarModal(false)}
          onSuccess={cargarEspecialidades}
        />
      )}
    </div>
  );
}

export default Especialidades;
