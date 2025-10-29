import { useEffect, useState } from 'react';
import { obtenerMedicos, eliminarMedico } from '../services/medicoService';
import MedicoModal from './components/CrearMedicoModal';
import { FaEdit, FaTrashAlt, FaUserMd } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import Swal from 'sweetalert2';

function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modo, setModo] = useState('crear');
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);

  const cargarMedicos = async () => {
    try {
      const response = await obtenerMedicos();
      setMedicos(response.data.data);
    } catch (error) {
      console.error('Error al cargar médicos', error);
    }
  };

  useEffect(() => {
    cargarMedicos();
  }, []);

  const abrirModalCrear = () => {
    setModo('crear');
    setMedicoSeleccionado(null);
    setMostrarModal(true);
  };

  const abrirModalEditar = (medico) => {
    setModo('editar');
    setMedicoSeleccionado(medico);
    setMostrarModal(true);
  };

  const handleEliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Eliminar médico?',
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
        await eliminarMedico(id);
        await cargarMedicos();

        Swal.fire({
          title: 'Eliminado',
          text: 'El médico ha sido eliminado correctamente.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      } catch (error) {
        console.error('Error al eliminar médico', error);
        Swal.fire('Error', 'No se pudo eliminar el médico.', 'error');
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">
          <FaUserMd className="me-2" />
          Médicos Registrados
        </h2>
        <button className="btn btn-success d-flex align-items-center" onClick={abrirModalCrear}>
          <BsPlusLg className="me-2" /> Registrar Médico
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle shadow-sm border rounded">
          <thead className="table-primary text-center">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Especialidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {medicos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-muted py-4">No hay médicos registrados</td>
              </tr>
            ) : (
              medicos.map((medico) => (
                <tr key={medico.id_medico}>
                  <td>{medico.id_medico}</td>
                  <td>{medico.personal_clinico?.nombres || 'No disponible'}</td>
                  <td>
                    {(medico.personal_clinico?.apellido_paterno || '') + ' ' +
                      (medico.personal_clinico?.apellido_materno || '')}
                  </td>
                  <td>{medico.personal_clinico?.email || 'No disponible'}</td>
                  <td>{medico.especialidad?.nombre || 'No asignado'}</td>
                  <td>
                    <button
                      className="btn btn-outline-warning btn-sm me-2"
                      title="Editar"
                      onClick={() => abrirModalEditar(medico)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      title="Eliminar"
                      onClick={() => handleEliminar(medico.id_medico)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <MedicoModal
          modo={modo}
          medico={medicoSeleccionado}
          onClose={() => setMostrarModal(false)}
          onSuccess={cargarMedicos}
        />
      )}
    </div>
  );
}

export default Medicos;
